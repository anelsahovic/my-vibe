import type { Metadata } from 'next';

import './globals.css';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
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

        <main className="max-w-7xl mx-auto px-4 container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 h-1/3 bg-card rounded-lg ">
                sidebar
              </div>
            </div>
            <div className="lg:col-span-6">{children}</div>
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 h-1/3 bg-card rounded-lg ">
                Who to follow
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
