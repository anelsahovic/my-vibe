/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Event } from '@/app/events/[id]/page';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import AttendButton from './AttendButton';
import { deleteEvent, isAttending, isOwnEvent } from '@/actions/event.action';
import { DeleteAlertDialog } from './DeleteAlertDialog';
import { useEffect, useState } from 'react';
import EventEditForm from './EventEditForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = {
  event: Event;
};

export default function EventLargeCard({ event }: Props) {
  if (!event) {
    return;
  }
  const [isDeleting, setIsDeleting] = useState(false);
  const [userAttendance, setUserAttendance] = useState(false);
  const [ownEvent, setOwnEvent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchInfo = async () => {
      setUserAttendance(await isAttending(event.id));
      setOwnEvent(await isOwnEvent(event.id));
    };
    fetchInfo();
  }, [event.id]);

  const handleDeleteEvent = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const result = await deleteEvent(event.id);
      if (result.success) {
        router.push('/events');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to delete post', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full h-full max-w-4xl">
      {/* Header */}
      <CardHeader className="p-3 bg-gradient-to-tr from-primary to-amber-500 text-white flex flex-row justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-4">
          <Link href={`/profile/${event.organizer.username}`}>
            <Avatar className="size-10 sm:size-14 md:size-16 lg:size-20">
              <AvatarImage src={event.organizer?.image as string} />
              <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                {event.organizer?.name?.[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/profile/${event.organizer.username}`}>
              <h3 className="text-lg font-semibold">{event.organizer.name}</h3>
            </Link>
            <p className="text-sm opacity-80">Organizer</p>
          </div>
        </div>
        <Badge
          className="text-sm sm:text-base md:text-lg "
          variant={event.price ? 'secondary' : 'success'}
        >
          {event.price ? event.price.toFixed(2) + '$' : 'FREE'}
        </Badge>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-4">
        <CardTitle className="text-2xl text-neutral-300">
          {event.name}
        </CardTitle>
        <CardDescription className="text-neutral-400">
          {event.description}
        </CardDescription>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">Event Type</span>
            <span>{event.isOnline ? 'Online' : 'In-Person'}</span>
          </div>
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">Location</span>
            <span>{event.location || 'TBD'}</span>
          </div>
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">Start Date</span>
            <span>{new Date(event.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">End Date</span>
            <span>{new Date(event.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">Capacity</span>
            <span>{event.capacity || 'Unlimited'} attendees</span>
          </div>
          <div className="flex flex-col bg-card-foreground p-4 rounded-lg">
            <span className="font-semibold text-neutral-400">Attendees</span>
            <span>{event._count.attendees}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-6  flex justify-end">
        {ownEvent ? (
          <div className="grid grid-cols-2 items-center gap-2">
            <EventEditForm event={event} />
            <div>
              <DeleteAlertDialog
                isDeleting={isDeleting}
                onDelete={() => handleDeleteEvent()}
                title="Delete Event"
                buttonText="Delete"
                variant="destructive"
              />
            </div>
          </div>
        ) : (
          <AttendButton eventId={event.id} userAttending={userAttendance} />
        )}
      </CardFooter>
    </Card>
  );
}
