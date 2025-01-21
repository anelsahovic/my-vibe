import {
  getProfileByUsername,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.action';
import { getDbUser } from '@/actions/user.action';
import ProfilePage from '@/components/ProfilePage';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `@${user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfileRoute({ params }: Props) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  const userAuth = await getDbUser();

  if (!user) notFound();

  const [posts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    // getUserEvents(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePage
      userDb={user}
      userAuth={userAuth}
      posts={posts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
