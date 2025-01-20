import { getPosts } from '@/actions/post.actions';
import { getDbUser, getRandomUsers } from '@/actions/user.action';
import CreatePost from '@/components/CreatePost';
import EventSmallCard from '@/components/EventSmallCard';
import PostCard from '@/components/PostCard';
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

let events = [
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

// let users = [
//   {
//     id: 'u1',
//     name: 'John Doe',
//     username: 'johndoe',
//     image: '',
//   },
//   {
//     id: 'u2',
//     name: 'Brus Willis',
//     username: 'bruswillis',
//     image: '',
//   },
//   {
//     id: 'u3',
//     name: 'Marie Smith',
//     username: 'mariesmith',
//     image: '',
//   },
//   {
//     id: 'u4',
//     name: 'Jack Sparrow',
//     username: 'jacksparrow',
//     image: '',
//   },
//   {
//     id: 'u5',
//     name: 'Mona Gonzales',
//     username: 'monagonzales',
//     image: '',
//   },
// ];

export default async function page() {
  const user = await getDbUser();
  const users = await getRandomUsers();
  const posts: Post[] = await getPosts();

  events = events.slice(0, 4);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
          <CreatePost />

          {/* show posts */}
          <div className="flex flex-col items-center w-full space-y-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} user={user} />
            ))}
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
                  href=""
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
                    <UserSmallCard key={user.id} user={user} />
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
