'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toggleFollow } from '@/actions/user.action';

type Props = {
  userId: string;
  text: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

export default function FollowButton({ userId, size, variant, text }: Props) {
  const [isLoading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);

    try {
      await toggleFollow(userId);
    } catch (error) {
      console.error('Error following user', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : text}
    </Button>
  );
}
