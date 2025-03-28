'use server';
import { getServerSession } from 'next-auth/next';
import { hashSync } from 'bcrypt';
import { authOptions } from '../_lib/auth';
import { prisma } from '@/prisma/prisma-client';

export async function updateUserInfo(body: {
  fullName: string;
  email: string;
  password: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}
