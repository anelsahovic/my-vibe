import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cherryBombOne } from '@/lib/fonts';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FaGlobeAmericas, FaShareSquare, FaStar } from 'react-icons/fa';
import { MdRocketLaunch } from 'react-icons/md';

export default async function Home() {
  // if user exists redirect to /home
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    redirect('/home');
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-4 text-white">
      {/* Card */}
      <Card className="flex flex-col md:flex-row max-w-4xl w-full rounded-lg overflow-hidden shadow-lg">
        {/* Left Section - Image */}
        <div className="relative w-full md:w-1/2 h-52 md:h-auto">
          <Image
            src="/images/friends.jpg"
            alt="My Vibe"
            className="object-cover"
            fill={true}
          />
        </div>

        {/* Right Section - App Info */}
        <div className=" flex flex-col items-center md:items-start justify-center w-full md:w-1/2 p-4 md:p-10 space-y-8 md:space-y-12 text-white relative">
          <CardHeader className="w-full p-0">
            <CardTitle className="flex flex-col w-full space-y-2 items-center p-0">
              <Image
                src="/logo.png"
                alt="My Vibe Logo"
                width={80}
                height={80}
                className="text-3xl md:text-4xl font-bold"
              />
              <span
                className={`${cherryBombOne.className} text-3xl md:text-5xl font-bold text-primary`}
              >
                my vibe
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-center p-0 space-y-6">
            <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed">
              Experience the ultimate social platform designed for creativity,
              connection, and inspiration. My Vibe is where you belong.
            </p>
            {/* Feature List */}
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="text-primary text-2xl md:text-3xl flex items-center">
                  <FaStar />
                </span>
                <span className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
                  Showcase your personality with{' '}
                  <strong className="text-white">dynamic profiles</strong>.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-primary text-2xl md:text-3xl flex items-center">
                  <FaShareSquare />
                </span>
                <span className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
                  Share your vibe through{' '}
                  <strong className="text-white">
                    photos, videos, and stories
                  </strong>
                  .
                </span>
              </li>

              <li className="flex items-center gap-4">
                <span className="text-primary text-2xl md:text-3xl flex items-center">
                  <FaGlobeAmericas />
                </span>
                <span className="text-gray-300 font-medium text-sm md:text-base leading-relaxed">
                  Discover and connect with a{' '}
                  <strong className="text-white">global community</strong>.
                </span>
              </li>
            </ul>
          </CardContent>

          <CardFooter className="p-0">
            <LoginLink className="">
              <Button className="font-semibold md:text-base">
                Get Started for Free <MdRocketLaunch />{' '}
              </Button>
            </LoginLink>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
