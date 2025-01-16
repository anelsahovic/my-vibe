'use client';

import { usePathname } from 'next/navigation';
import { navItems } from './TopNavbar';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { LuMenu } from 'react-icons/lu';
import Image from 'next/image';
import { cherryBombOne } from '@/lib/fonts';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from './ui/button';

export default function BottomNavbar() {
  const urlPath = usePathname();
  const bottomNavItems = navItems.filter((item) => item.title !== 'New');

  // hide on landing page
  if (urlPath === '/') {
    return <></>;
  }

  return (
    <div className="md:hidden fixed bottom-0 h-14 w-full bg-card flex items-center z-50">
      {/*  small screen bottom nav */}
      <nav className="flex items-center gap-4 w-full justify-around">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2"
          >
            {urlPath === item.href ? (
              <item.iconSelected className="size-6 text-primary" />
            ) : (
              <item.iconDefault className="size-6" />
            )}
            <span className="hidden lg:block text-base text-neutral-100">
              {item.title}
            </span>
          </Link>
        ))}

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger>
            <LuMenu className="size-6" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Image
                    src="/logo.png"
                    alt="My Vibe Logo"
                    width={70}
                    height={70}
                    className="md:size-12"
                  />
                  <span
                    className={` ${cherryBombOne.className} text-3xl font-bold text-primary `}
                  >
                    my vibe
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription>
                Experience the ultimate social media platform
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col items-center justify-around gap-10 pt-10">
              <nav className="flex flex-col items-center justify-center gap-4 w-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-center px-1 space-x-1`}
                  >
                    {urlPath === item.href ? (
                      <item.iconSelected className="size-6 text-primary" />
                    ) : (
                      <item.iconDefault className="size-6" />
                    )}
                    <span
                      className={` text-lg text-neutral-100 ${
                        urlPath === item.href &&
                        'text-primary text-base font-semibold'
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="w-full flex flex-col items-center  p-6 rounded-lg shadow-lg max-w-sm">
                <span className="text-lg font-semibold text-primary/80">
                  My Account
                </span>
                <div className="w-full h-[2px] bg-secondary mb-4" />

                <div className="flex flex-col items-center w-full space-y-4">
                  <Link
                    href="/profile"
                    className="w-full text-center rounded-lg"
                  >
                    See Profile
                  </Link>

                  <Link
                    href="/profile/edit"
                    className="w-full text-center rounded-lg "
                  >
                    Edit Profile
                  </Link>

                  <LogoutLink>
                    <Button variant="secondary">Sign out</Button>
                  </LogoutLink>
                </div>
              </div>
            </div>
            <SheetFooter className="w-full flex flex-col items-center space-y-1">
              <div className="flex gap-4 mt-2">
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800 transition"
                >
                  Privacy
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="">&copy; {new Date().getFullYear()}</span>
                <Link href="#" className="hover:text-primary">
                  anelsahovic
                </Link>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
