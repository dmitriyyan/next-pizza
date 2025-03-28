import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/(root)/_lib/auth';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: '[USER_GET] Server error' },
      { status: 500 },
    );
  }
}
