import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HomeIcon } from 'lucide-react';
import { MdOutlineEvent } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            {/* LARGE 404 TEXT */}
            <p className="text-8xl font-bold text-primary font-mono">404</p>

            {/* MESSAGE */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Event not found
              </h1>
              <p className="text-muted-foreground">
                The event you are looking for doesn&apos;t exist.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/home"
                className={buttonVariants({ variant: 'default' })}
              >
                <HomeIcon className="mr-2 size-4" />
                Back to Home
              </Link>
              <Link
                href="/events"
                className={buttonVariants({ variant: 'secondary' })}
              >
                <MdOutlineEvent className="mr-2 size-4" />
                Back to Events
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
