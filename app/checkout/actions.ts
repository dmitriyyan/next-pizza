'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/widgets/checkout-form';
// import { PayOrderTemplate } from '@/shared/components';
// import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus } from '@prisma/client';
// import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

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

    // TODO: remove
    return 'test';

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

    // await sendEmail(
    //   data.email,
    //   'Next Pizza / Оплатите заказ #' + order.id,
    //   PayOrderTemplate({
    //     orderId: order.id,
    //     totalAmount: order.totalAmount,
    //     paymentUrl,
    //   }),
    // );

    return paymentUrl;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

// export async function updateUserInfo(body: Prisma.UserUpdateInput) {
//   try {
//     const currentUser = await getUserSession();

//     if (!currentUser) {
//       throw new Error('Пользователь не найден');
//     }

//     const findUser = await prisma.user.findFirst({
//       where: {
//         id: Number(currentUser.id),
//       },
//     });

//     await prisma.user.update({
//       where: {
//         id: Number(currentUser.id),
//       },
//       data: {
//         fullName: body.fullName,
//         email: body.email,
//         password: body.password
//           ? hashSync(body.password as string, 10)
//           : findUser?.password,
//       },
//     });
//   } catch (err) {
//     console.log('Error [UPDATE_USER]', err);
//     throw err;
//   }
// }

// export async function registerUser(body: Prisma.UserCreateInput) {
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         email: body.email,
//       },
//     });

//     if (user) {
//       if (!user.verified) {
//         throw new Error('Почта не подтверждена');
//       }

//       throw new Error('Пользователь уже существует');
//     }

//     const createdUser = await prisma.user.create({
//       data: {
//         fullName: body.fullName,
//         email: body.email,
//         password: hashSync(body.password, 10),
//       },
//     });

//     const code = Math.floor(100000 + Math.random() * 900000).toString();

//     await prisma.verificationCode.create({
//       data: {
//         code,
//         userId: createdUser.id,
//       },
//     });

//     await sendEmail(
//       createdUser.email,
//       'Next Pizza / 📝 Подтверждение регистрации',
//       VerificationUserTemplate({
//         code,
//       }),
//     );
//   } catch (err) {
//     console.log('Error [CREATE_USER]', err);
//     throw err;
//   }
// }

import ky from 'ky';

export type PaymentData = {
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

export type Amount = {
  value: string;
  currency: string;
};

export type Recipient = {
  account_id: string;
  gateway_id: string;
};

export type Confirmation = {
  type: string;
  confirmation_url: string;
};

export type Metadata = {
  order_id: string;
};

export type PaymentCallbackData = {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: { value: string; currency: 'RUB' };
    income_amount: { value: string; currency: 'RUB' };
    description: string;
    recipient: { account_id: string; gateway_id: string };
    payment_method: {
      type: string;
      id: string;
      saved: boolean;
      title: string;
    };
    captured_at: string;
    created_at: string;
    test: boolean;
    refunded_amount: { value: string; currency: 'RUB' };
    paid: boolean;
    refundable: true;
    metadata: { order_id: string };
    authorization_details: {
      rrn: string;
      auth_code: string;
    };
  };
};

type Props = {
  description: string;
  orderId: number;
  amount: number;
};

export async function createPayment(details: Props) {
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
