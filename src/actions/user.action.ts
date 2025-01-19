'use server';

import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

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

export async function getRandomUsers() {
  try {
    const userId = await getDbUserId();

    // get 3 random users, exclude auth user and users that are followed
    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          { NOT: { id: userId } },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });

    return randomUsers;
  } catch (error) {
    console.error('Error fetching random users', error);
    return [];
  }
}

export async function toggleFollow(userId: string) {
  try {
    const authUserId = await getDbUserId();

    if (authUserId === userId) throw new Error('You cannot follow yourself');

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: authUserId,
          followingId: userId,
        },
      },
    });

    if (existingFollow) {
      // unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: authUserId,
            followingId: userId,
          },
        },
      });
    } else {
      // follow
      await prisma.$transaction([
        prisma.follows.create({
          data: {
            followerId: authUserId,
            followingId: userId,
          },
        }),
        prisma.notification.create({
          data: {
            type: 'FOLLOW',
            userId: userId, //user being followed
            creatorId: authUserId, //user following
          },
        }),
      ]);

      revalidatePath('/home');
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error following user' };
  }
}
