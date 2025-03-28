import { sendEmail } from '@/app/(root)/_lib/utils';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/shared/api/dto';
import { OrderSuccessTemplate } from '@/widgets/email-templates';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

export const PaymentCallbackSchema = z.object({
  type: z.string(),
  event: z.string(),
  object: z.object({
    id: z.string(),
    status: z.enum(['succeeded', 'canceled']),
    amount: z.object({ value: z.string(), currency: z.literal('RUB') }),
    income_amount: z.object({ value: z.string(), currency: z.literal('RUB') }),
    description: z.string(),
    recipient: z.object({ account_id: z.string(), gateway_id: z.string() }),
    payment_method: z.object({
      type: z.string(),
      id: z.string(),
      saved: z.boolean(),
      title: z.string(),
    }),
    captured_at: z.string(),
    created_at: z.string(),
    test: z.boolean(),
    refunded_amount: z.object({
      value: z.string(),
      currency: z.literal('RUB'),
    }),
    paid: z.boolean(),
    refundable: z.literal(true),
    metadata: z.object({ order_id: z.string() }),
    authorization_details: z.object({
      rrn: z.string(),
      auth_code: z.string(),
    }),
  }),
});

export type PaymentCallbackData = z.infer<typeof PaymentCallbackSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = PaymentCallbackSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: parsedBody.data.object.metadata.order_id,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    if (!order.email) {
      return NextResponse.json({ error: 'Order email not found' });
    }

    const isSucceeded = parsedBody.data.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    let items: CartItemDTO[] = [];

    if (typeof order.items === 'string') {
      items = JSON.parse(order.items);
    }

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: Number(order.id), items }),
      );
    }
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
