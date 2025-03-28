'use server';

import { prisma } from '@/prisma/prisma-client';
import ky from 'ky';
import { PayOrderTemplate } from '@/widgets/email-templates';
import { CheckoutFormValues } from '@/widgets/checkout-form';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { sendEmail } from '@/app/(root)/_lib/utils';

export async function createOrderAction(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возвращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Если корзина пустая возвращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const simplifiedItems = userCart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      cartId: item.cartId,
      productItem: {
        id: item.productItem.id,
        name: item.productItem.product.name,
        price: item.productItem.price,
        size: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        product: {
          id: item.productItem.product.id,
          name: item.productItem.product.name,
          categoryId: item.productItem.product.categoryId,
        },
      },
      ingredients: item.ingredients.map((ing) => ({
        id: ing.id,
        name: ing.name,
        price: ing.price,
      })),
    }));

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(simplifiedItems),
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: Number(order.id),
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;
    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: Number(order.id),
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

type PaymentData = {
  id: string;
  status: string;
  amount: Amount;
  description: string;
  recipient: Recipient;
  created_at: string;
  confirmation: Confirmation;
  test: boolean;
  paid: boolean;
  refundable: boolean;
  metadata: Metadata;
};

type Amount = {
  value: string;
  currency: string;
};

type Recipient = {
  account_id: string;
  gateway_id: string;
};

type Confirmation = {
  type: string;
  confirmation_url: string;
};

type Metadata = {
  order_id: string;
};

type Props = {
  description: string;
  orderId: number;
  amount: number;
};

async function createPayment(details: Props) {
  const response = await ky.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      json: {
        amount: {
          value: details.amount.toString(),
          currency: 'RUB',
        },
        capture: true,
        description: details.description,
        metadata: {
          order_id: details.orderId,
        },
        confirmation: {
          type: 'redirect',
          return_url: process.env.YOOKASSA_CALLBACK_URL,
        },
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
        Authorization: `${process.env.YOOKASSA_STORE_ID}:${process.env.YOOKASSA_API_KEY}`,
      },
    },
  );

  return response.json();
}
