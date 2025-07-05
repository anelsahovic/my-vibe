import type { Metadata } from 'next';

import './globals.css';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Toaster } from 'react-hot-toast';
import { roboto } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'My Vibe',
  description: 'Share your vibe and connect with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}   antialiased relative`}>
        <TopNavbar />
        <BottomNavbar />

        <main className="max-w-7xl mx-auto px-4 relative">
          <Toaster position="top-center" />

          {children}
        </main>
      </body>
    </html>
  );
}
