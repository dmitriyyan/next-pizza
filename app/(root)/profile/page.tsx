import { prisma } from '@/prisma/prisma-client';
import { redirect } from 'next/navigation';
import { authOptions } from '../_lib/auth';
import { getServerSession } from 'next-auth/next';
import { ProfileForm } from '@/features/profile-form';
import { updateUserInfo } from './actions';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} updateUserInfoAction={updateUserInfo} />;
}
