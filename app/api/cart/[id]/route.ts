import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { updateCartTotalAmount } from '../lib';
import { z } from 'zod';

const updateCartItemSchema = z.object({
  quantity: z.number(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Не удалось получить токен корзины' },
        { status: 401 },
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
    }

    const body = await req.json();
    const result = updateCartItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Некорректный запрос',
        },
        { status: 400 },
      );
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: result.data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось обновить корзину' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Не удалось получить токен корзины' },
        { status: 401 },
      );
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар не найден' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json(
      { message: 'Не удалось удалить корзину' },
      { status: 500 },
    );
  }
}
