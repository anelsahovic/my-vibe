'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toggleAttend } from '@/actions/event.action';

type Props = {
  eventId: string;
  userAttending: boolean;
};

export default function AttendButton({ eventId, userAttending }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [isAttending, setIsAttending] = useState(userAttending);

  const handleAttend = async () => {
    setLoading(true);

    try {
      await toggleAttend(eventId);
      setIsAttending((prev) => !prev);
    } catch (error) {
      console.error('Error following user', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={isAttending ? 'secondary' : 'default'}
      onClick={handleAttend}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isAttending ? (
        'Cancel Attendance'
      ) : (
        'Attend Event'
      )}
    </Button>
  );
}
