'use server';

import prisma from '@/lib/prisma';
import { userSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
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
      revalidatePath('/home');
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

export async function removeUser(userId: string) {
  try {
    const authUserId = await getDbUserId();

    if (authUserId === userId) throw new Error('You cannot unfollow yourself');

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authUserId,
        },
      },
    });

    if (existingFollow) {
      // unfollow
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: authUserId,
          },
        },
      });
      revalidatePath('/friends');
      return { success: true };
    } else return { success: false, error: 'This user is not following you.' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error removing follower' };
  }
}

export async function updateUser(prevState: unknown, formData: FormData) {
  const user = await getDbUser();

  if (!user) throw new Error('Unauthorized');

  const submission = parseWithZod(formData, { schema: userSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: submission.value.name,
        username: submission.value.username,
        email: submission.value.email,
        bio: submission.value.bio,
        location: submission.value.location,
        website: submission.value.website,
      },
    });

    revalidatePath('/profile');
    return { status: 'success' as const };
  } catch (error) {
    return {
      status: 'error' as const,
      error: {
        error: error,
      } as Record<string, string[] | null>,
    };
  }
}

export async function getUserFollowers() {
  try {
    const userId = await getDbUserId();

    const followers = await prisma.follows.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: {
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
        },
      },
    });

    const formattedFollowers = followers.map((follow) => ({
      id: follow.follower.id,
      username: follow.follower.username,
      name: follow.follower.name,
      image: follow.follower.image,
      _count: {
        followers: follow.follower._count?.followers || 0,
      },
    }));
    return formattedFollowers;
  } catch (error) {
    console.error('Error fetching random users', error);
    return [];
  }
}

export async function getUserFollowing() {
  try {
    const userId = await getDbUserId();

    const following = await prisma.follows.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
            _count: {
              select: {
                followers: true,
              },
            },
          },
        },
      },
    });

    const formattedFollowing = following.map((follow) => ({
      id: follow.following.id,
      username: follow.following.username,
      name: follow.following.name,
      image: follow.following.image,
      _count: {
        followers: follow.following._count?.followers || 0,
      },
    }));

    return formattedFollowing;
  } catch (error) {
    console.error('Error fetching random users', error);
    return [];
  }
}
