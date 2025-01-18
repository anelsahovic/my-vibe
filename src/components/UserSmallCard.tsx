import { UserSmallCardType } from '@/lib/types';
import React from 'react';
import { Card } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';

type Props = {
  user: UserSmallCardType;
};

export default function UserSmallCard({ user }: Props) {
  return (
    <Card className="flex items-center justify-between w-full p-2 bg-card-foreground shadow-sm border">
      {/* left-user info */}
      <div className="flex items-center justify-center space-x-2 overflow-hidden">
        <div className="size-9 rounded-full overflow-hidden relative">
          <Image
            src={user.image ? user.image : '/images/user-alt.png'}
            alt="user-image"
            fill={true}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col items-start justify-start truncate">
          <h2 className="text-base font-medium text-neutral-300 ">
            {user.name}
          </h2>
          <p className="text-sm text-neutral-400">@{user.username}</p>
        </div>
      </div>

      {/* right - follow button */}
      <div>
        <Button>Follow</Button>
      </div>
    </Card>
  );
}
