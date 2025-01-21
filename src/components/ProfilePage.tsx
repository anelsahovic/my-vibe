'use client';

import { getProfileByUsername, getUserPosts } from '@/actions/profile.action';
import { toggleFollow } from '@/actions/user.action';
import PostCard from '@/components/PostCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserDb } from '@/lib/types';
import { format } from 'date-fns';
import { CalendarIcon, FileTextIcon, LinkIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdEventNote } from 'react-icons/md';
import EventSmallCard from './EventSmallCard';
import ProfileForm from './ProfileForm';

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

type Props = {
  userDb: NonNullable<User>;
  userAuth: UserDb;
  posts: Posts;
  isFollowing: boolean;
};

const events = [
  {
    id: 'e1',
    name: 'Tech Innovators Conference',
    description: 'Join industry leaders to discuss the future of technology.',
    location: 'Berlin, Germany',
    startDate: new Date('2025-01-20T09:00:00Z'),
    endDate: new Date('2025-01-20T17:00:00Z'),
    isOnline: false,
    capacity: 500,
    price: 199.99,
    organizer: {
      id: 'u1',
      name: 'John Doe',
    },
    attendees: [
      { id: 'u2', name: 'Alice Johnson' },
      { id: 'u3', name: 'Bob Smith' },
    ],
  },
  {
    id: 'e2',
    name: 'Web3 Summit',
    description: 'Explore the possibilities of decentralized web technologies.',
    location: 'Online',
    startDate: new Date('2025-02-10T13:00:00Z'),
    endDate: new Date('2025-02-10T18:00:00Z'),
    isOnline: true,
    capacity: 1000,
    price: 0,
    organizer: {
      id: 'u4',
      name: 'Jane Williams',
    },
    attendees: [
      { id: 'u5', name: 'Michael Brown' },
      { id: 'u6', name: 'Emily Davis' },
    ],
  },
  {
    id: 'e3',
    name: 'Fitness Bootcamp',
    description:
      'A weekend to kickstart your fitness journey with top trainers.',
    location: 'New York City, USA',
    startDate: new Date('2025-03-01T08:00:00Z'),
    endDate: new Date('2025-03-02T16:00:00Z'),
    isOnline: false,
    capacity: 50,
    price: 49.99,
    organizer: {
      id: 'u7',
      name: 'Chris Taylor',
    },
    attendees: [
      { id: 'u8', name: 'Sophia Wilson' },
      { id: 'u9', name: 'Daniel Martinez' },
    ],
  },
  {
    id: 'e4',
    name: 'Art Workshop for Beginners',
    description: 'Learn the basics of painting and sketching from an expert.',
    location: 'Paris, France',
    startDate: new Date('2025-03-15T10:00:00Z'),
    endDate: new Date('2025-03-15T15:00:00Z'),
    isOnline: false,
    capacity: 20,
    price: 30.0,
    organizer: {
      id: 'u10',
      name: 'Laura Lee',
    },
    attendees: [],
  },
  {
    id: 'e5',
    name: 'Entrepreneurship Bootcamp',
    description: 'A hands-on workshop to refine your business ideas.',
    location: 'San Francisco, USA',
    startDate: new Date('2025-04-05T10:00:00Z'),
    endDate: new Date('2025-04-05T17:00:00Z'),
    isOnline: false,
    capacity: 100,
    price: 99.99,
    organizer: {
      id: 'u11',
      name: 'Peter Green',
    },
    attendees: [
      { id: 'u12', name: 'Olivia Clark' },
      { id: 'u13', name: 'James Walker' },
    ],
  },
];

export default function ProfilePage({
  isFollowing: initialIsFollowing,
  posts,
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
            <div className="space-y-6">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventSmallCard key={event.id} event={event} />
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
