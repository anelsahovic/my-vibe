'use server';

import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function getUserByKindeId(kindeId: string) {
  return prisma.user.findUnique({
    where: {
      kindeId: kindeId,
    },
  });
}

export async function getDbUserId() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser) throw new Error('Unauthorized');

  const dbUser = await getUserByKindeId(authUser.id);

  if (!dbUser) throw new Error('User not found');

  return dbUser.id;
}

export async function getDbUser() {
  const { getUser } = getKindeServerSession();
  const authUser = await getUser();

  if (!authUser || !authUser.id) throw new Error('User is not authenticated');

  const dbUser = await getUserByKindeId(authUser.id);

  if (!dbUser) throw new Error('User not found in the database.');

  return dbUser;
}
