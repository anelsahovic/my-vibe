'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { removeUser } from '@/actions/user.action';

type Props = {
  userId: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
};

export default function RemoveUserButton({ userId, size }: Props) {
  const [isLoading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);

    try {
      await removeUser(userId);
    } catch (error) {
      console.error('Error following user', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size={size}
      variant="outline"
      onClick={handleRemove}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Remove'}
    </Button>
  );
}
