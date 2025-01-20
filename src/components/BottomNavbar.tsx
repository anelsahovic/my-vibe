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
import { useEffect, useState } from 'react';
import { getNotifications } from '@/actions/notification.action';
import { Notification } from '@/lib/types';

export default function BottomNavbar() {
  const urlPath = usePathname();
  if (urlPath === '/') {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(urlPath);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchNotifications();
  }, [urlPath]);

  const bottomNavItems = navItems.filter((item) => item.title !== 'New');
  // hide on landing page

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
            <div className="relative">
              {urlPath === item.href ? (
                <item.iconSelected className="size-6 text-primary" />
              ) : (
                <item.iconDefault className="size-6" />
              )}
              {item.href === '/notifications' &&
                notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute flex items-center justify-center top-0 left-0 -translate-x-1 -translate-y-1 size-3.5 lg:size-4 rounded-full bg-amber-500 text-background text-[10px] font-semibold">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
            </div>
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
                    <div className="relative">
                      {urlPath === item.href ? (
                        <item.iconSelected className="size-6 text-primary" />
                      ) : (
                        <item.iconDefault className="size-6" />
                      )}
                      {item.href === '/notifications' &&
                        notifications.filter((n) => !n.read).length > 0 && (
                          <span className="absolute flex items-center justify-center top-0 left-0 -translate-x-1 -translate-y-1 size-3.5 lg:size-4 rounded-full bg-amber-500 text-background text-[10px] font-semibold">
                            {notifications.filter((n) => !n.read).length}
                          </span>
                        )}
                    </div>
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
