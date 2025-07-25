import { getEvents } from '@/actions/event.action';
import { getPosts } from '@/actions/post.actions';
import { getDbUser, getRandomUsers } from '@/actions/user.action';
import CreatePost from '@/components/CreatePost';
import EventSmallCard from '@/components/EventSmallCard';
import PostCard from '@/components/PostCard';
import SearchFormReset from '@/components/SearchFormReset';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserSmallCard from '@/components/UserSmallCard';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { MdEventNote } from 'react-icons/md';

type Props = {
  searchParams: Promise<{ search: string }>;
};

export default async function page({ searchParams }: Props) {
  const { search } = await searchParams;
  const user = await getDbUser();
  const users = await getRandomUsers();
  const posts: Post[] = await getPosts();
  let events = await getEvents();
  if (!events) {
    return;
  }
  events = events.slice(0, 4);

  const filteredPosts = posts.filter(
    (post) =>
      search && post.content?.toLowerCase().includes(search.toLowerCase())
  );

  const postsToDisplay = search ? filteredPosts : posts;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-20">
      {/* left */}
      <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28 h-[532px]">
          <Card>
            <CardHeader className="flex flex-col items-center justify-center">
              <CardTitle className="flex items-center space-x-1 text-neutral-100">
                <span>
                  <MdEventNote className="size-5" />
                </span>
                <h2>NEWEST EVENTS</h2>
                <span>
                  <MdEventNote className="size-5" />
                </span>
              </CardTitle>
              <CardDescription>
                Don&apos;t miss out on newest events
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 px-3">
              {events.map((event) => (
                <EventSmallCard key={event.id} event={event} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* center */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center mt-10">
        <div className="w-full flex flex-col items-center space-y-10">
          {/* create post */}
          {!search && <CreatePost />}

          {search && (
            <div className="flex items-center gap-2">
              <p className="text-center">
                Showing results for{'  '}
                <span className="font-semibold">&quot;{search}&quot;</span>
              </p>
              <SearchFormReset page="/home" />
            </div>
          )}

          {/* show posts */}
          <div className="flex flex-col items-center w-full space-y-6">
            {postsToDisplay.length ? (
              postsToDisplay.map((post: Post) => (
                <PostCard key={post.id} post={post} user={user} />
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
      </div>

      {/* right */}
      <div className="hidden lg:block lg:col-span-3">
        <div className="sticky top-28 h-[532px]">
          <div className="h-full w-full flex flex-col items-center space-y-6">
            {/* Welcome back */}
            <Card className="h-1/3 w-full flex flex-col justify-between">
              {/* Welcome Header */}
              <CardHeader className="rounded-t-md py-3 bg-gradient-to-tr from-primary to-amber-500 text-white">
                <h2 className="text-lg font-bold">
                  Welcome Back, @{user?.username}!
                </h2>
                <p className="text-sm text-blue-200">
                  Let&apos;s make today memorable.
                </p>
              </CardHeader>

              {/* Profile Action */}
              <CardContent className="flex items-center justify-between px-3 py-5 overflow-hidden">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                      {user?.name?.[0] ||
                        user?.username?.[0] ||
                        user?.email?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-sm text-neutral-300 font-medium">
                    {user?.name}
                  </p>
                </div>
                <Link
                  href={`/profile/${user.username}`}
                  className={buttonVariants({
                    variant: 'secondary',
                    size: 'sm',
                  })}
                >
                  View Profile
                </Link>
              </CardContent>
            </Card>

            {/* Who to follow */}
            <Card className="h-2/3 w-full">
              <CardHeader className="flex flex-col items-center justify-center">
                <CardTitle className="text-neutral-100">
                  <h2>WHO TO FOLLOW</h2>
                </CardTitle>
                <CardDescription>People you might know</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 px-3">
                {users.length ? (
                  users.map((user) => (
                    <UserSmallCard
                      key={user.id}
                      user={user}
                      btnSize="sm"
                      showRemoveButton={false}
                    />
                  ))
                ) : (
                  <p>No suggested users</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
