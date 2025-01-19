'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toggleFollow } from '@/actions/user.action';

type Props = {
  userId: string;
};

export default function FollowButton({ userId }: Props) {
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
    <Button size="sm" onClick={handleFollow} disabled={isLoading}>
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Follow'}
    </Button>
  );
}
