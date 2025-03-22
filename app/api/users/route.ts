import { prisma } from '@/prisma/prisma-client';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(4),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const user = await prisma.user.create({
    data: {
      ...result.data,
      password: await hash(result.data.password, 10),
    },
  });

  return NextResponse.json(user);
}
