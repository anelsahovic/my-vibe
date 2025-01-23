'use client';

import { getProfileByUsername, getUserPosts } from '@/actions/profile.action';
import { toggleFollow } from '@/actions/user.action';
import PostCard from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventMediumCardType, UserDb } from '@/lib/types';
import { format } from 'date-fns';
import { CalendarIcon, FileTextIcon, LinkIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdEventNote } from 'react-icons/md';
import ProfileForm from './ProfileForm';
import EventMediumCard from './EventMediumCard';

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

type Props = {
  userDb: NonNullable<User>;
  userAuth: UserDb;
  posts: Posts;
  events: EventMediumCardType[];
  isFollowing: boolean;
};

export default function ProfilePage({
  isFollowing: initialIsFollowing,
  posts,
  events,
  userDb,
  userAuth,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const handleFollow = async () => {
    if (!userAuth) return;

    try {
      setIsUpdatingFollow(true);
      await toggleFollow(userDb.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update follow status');
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  const isOwnProfile = userAuth?.username === userDb.username;

  const formattedDate = format(new Date(userDb.createdAt), 'MMMM yyyy');

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="grid grid-cols-1 gap-6">
        {/* user profile info */}
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="size-24">
                  <AvatarImage src={userDb?.image as string} />
                  <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                    {userDb?.name?.[0] || userDb?.username?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">
                  {userDb.name ?? userDb.username}
                </h1>
                <p className="text-muted-foreground">@{userDb.username}</p>
                <p className="mt-2 text-sm text-neutral-500">{userDb.bio}</p>

                {/* PROFILE STATS */}
                <div className="w-full mt-6">
                  <div className="grid grid-cols-3 mb-4">
                    <div>
                      <div className="font-semibold">
                        {userDb._count.posts.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>

                    <div>
                      <div className="font-semibold">
                        {userDb._count.followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Followers
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold">
                        {userDb._count.following.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Following
                      </div>
                    </div>
                  </div>
                </div>

                {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
                {isOwnProfile ? (
                  <ProfileForm user={userAuth} />
                ) : (
                  <Button
                    className="w-full mt-4"
                    onClick={handleFollow}
                    disabled={isUpdatingFollow}
                    variant={isFollowing ? 'secondary' : 'default'}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                )}

                {/* LOCATION & WEBSITE */}
                <div className="w-full mt-6 space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground capitalize">
                    <MapPinIcon className="size-4 mr-2" />
                    {userDb.location ? (
                      userDb.location
                    ) : (
                      <p className="text-xs italic">N/A</p>
                    )}
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <LinkIcon className="size-4 mr-2" />
                    {userDb.website ? (
                      <Link
                        href={
                          userDb.website.startsWith('http')
                            ? userDb.website
                            : `https://${userDb.website}`
                        }
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userDb.website}
                      </Link>
                    ) : (
                      <p className="text-xs italic">N/A</p>
                    )}
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="size-4 mr-2" />
                    Joined {formattedDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* tabs - showing posts and events */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <FileTextIcon className="size-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex items-center gap-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary
               data-[state=active]:bg-transparent px-6 font-semibold"
            >
              <MdEventNote className="size-4" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* posts */}
          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} user={userDb} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          {/* *TODO* - events */}
          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventMediumCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No events to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
