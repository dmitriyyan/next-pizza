import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(4),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = createUserSchema.safeParse(body);

  if (!data.success) {
    return NextResponse.json(
      { errors: data.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const user = await prisma.user.create({
    data: data.data,
  });

  return NextResponse.json(user);
}
