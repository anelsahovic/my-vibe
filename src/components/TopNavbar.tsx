/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { cherryBombOne } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoCalendarClearOutline, IoCalendarClearSharp } from 'react-icons/io5';

import { FaUserCircle } from 'react-icons/fa';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiMiniUsers, HiOutlineUsers } from 'react-icons/hi2';
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import SearchInput from './SearchInput';
import { useEffect, useState } from 'react';
import { Notification, UserDb } from '@/lib/types';
import { getNotifications } from '@/actions/notification.action';
import { getDbUser } from '@/actions/user.action';
import CreatePostDialog from './CreatePostDialog';

export const navItems = [
  {
    title: 'Home',
    href: '/home',
    iconDefault: GoHome,
    iconSelected: GoHomeFill,
  },
  {
    title: 'Events',
    href: '/events',
    iconDefault: IoCalendarClearOutline,
    iconSelected: IoCalendarClearSharp,
  },
  {
    title: 'Friends',
    href: '/friends',
    iconDefault: HiOutlineUsers,
    iconSelected: HiMiniUsers,
  },
  {
    title: 'Notifications',
    href: '/notifications',
    iconDefault: IoMdNotificationsOutline,
    iconSelected: IoMdNotifications,
  },
];

export default function TopNavbar() {
  const urlPath = usePathname();
  if (urlPath === '/') {
    return;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<UserDb>();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(urlPath);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };
    const fetchUser = async () => {
      try {
        const user = await getDbUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchUser();
    fetchNotifications();
  }, [urlPath]);

  const newNavItem = navItems.find((item) => item.title === 'New');
  // hide on landing page

  return (
    <div className="fixed top-0 h-14 w-full md:px-4 md:top-4 flex items-center justify-center z-50 ">
      <div className="flex items-center justify-between w-full h-full md:rounded-lg bg-card shadow-lg max-w-7xl mx-auto px-4">
        {/* logo */}
        <Link
          href="/home"
          className="flex items-center justify-center space-x-2 pl-4 md:pl-2"
        >
          <Image
            src="/logo.png"
            alt="My Vibe Logo"
            width={30}
            height={30}
            className="md:size-10"
          />
          <span
            className={` ${cherryBombOne.className} text-lg md:text-xl lg:text-2xl font-bold text-primary whitespace-nowrap`}
          >
            my vibe
          </span>
        </Link>

        {/* search input */}
        <div className=" hidden  lg:flex items-center md:max-w-xs lg:max-w-sm w-full ">
          <SearchInput />
        </div>

        {/* search / nav /  profile  */}
        <div className="flex items-center justify-end gap-4 h-full ">
          {/* search input */}
          <div className="flex items-center justify-center space-x-2  md:max-w-xs w-full lg:hidden">
            <SearchInput />
            <nav className="md:hidden">
              {newNavItem && (
                <Link
                  href={newNavItem.href}
                  className={`flex items-center justify-center px-1 space-x-1 h-full`}
                >
                  {urlPath === newNavItem.href ? (
                    <newNavItem.iconSelected className="size-6 text-primary" />
                  ) : (
                    <newNavItem.iconDefault className="size-6" />
                  )}
                </Link>
              )}
            </nav>
          </div>

          <div className="lg:hidden">
            <CreatePostDialog user={user as UserDb} />
          </div>

          {/* large screen nav */}
          <nav className="hidden md:flex items-center justify-center lg:justify-end gap-4 h-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-center px-1 space-x-1 h-full ${
                  urlPath === item.href && 'border-b-2 border-primary'
                }`}
              >
                <div className="relative">
                  {urlPath === item.href ? (
                    <item.iconSelected className="size-5 lg:size-6 text-primary" />
                  ) : (
                    <item.iconDefault className="size-5 lg:size-6" />
                  )}
                  {item.href === '/notifications' &&
                    notifications.filter((n) => !n.read).length > 0 && (
                      <span className="absolute flex items-center justify-center top-0 left-0 -translate-x-1 -translate-y-1 size-3.5 lg:size-4 rounded-full bg-amber-500 text-background text-[10px] lg:text-xs font-semibold">
                        {notifications.filter((n) => !n.read).length}
                      </span>
                    )}
                </div>

                <span
                  className={`hidden lg:block text-base text-neutral-100 ${
                    urlPath === item.href &&
                    'text-primary text-sm font-semibold'
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>

          {/* profile dropdown */}
          <div className="hidden md:flex">
            {/* profile menu*/}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <FaUserCircle className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/profile/${user?.username}`}
                    className="w-full h-full"
                  >
                    See Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem></DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutLink className="w-full h-full">Log Out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
