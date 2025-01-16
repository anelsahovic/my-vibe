'use client';

import { cherryBombOne } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IoCalendarClearOutline,
  IoCalendarClearSharp,
  IoCreate,
  IoCreateOutline,
} from 'react-icons/io5';

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

export const navItems = [
  {
    title: 'Home',
    href: '/home',
    iconDefault: GoHome,
    iconSelected: GoHomeFill,
  },
  {
    title: 'New',
    href: '/create',
    iconDefault: IoCreateOutline,
    iconSelected: IoCreate,
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
  const newNavItem = navItems.find((item) => item.title === 'New');
  // hide on landing page
  if (urlPath === '/') {
    return <></>;
  }
  return (
    <div className="fixed top-0 h-14 w-full md:px-4 md:top-4 flex items-center justify-center z-50 ">
      <div className="flex items-center justify-between w-full h-full md:rounded-lg bg-card shadow-lg max-w-7xl mx-auto px-4">
        {/* logo */}
        <div className="flex items-center justify-center space-x-2 pl-4 md:pl-2">
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
        </div>

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
                {urlPath === item.href ? (
                  <item.iconSelected className="size-5 lg:size-6 text-primary" />
                ) : (
                  <item.iconDefault className="size-5 lg:size-6" />
                )}
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaUserCircle className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full h-full">
                    See Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/edit" className="w-full h-full">
                    Edit Profile
                  </Link>
                </DropdownMenuItem>

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
