'use client';
import { EventMediumCardType } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { MdLocationPin } from 'react-icons/md';

type Props = {
  event: EventMediumCardType;
};

export default function EventMediumCard({ event }: Props) {
  const formattedStartDate = event.startDate.toLocaleDateString();
  const formattedEndDate = event.endDate.toLocaleDateString();

  return (
    <Link
      href={`/events/${event.id}`}
      className="hover:scale-105 hover:border hover:border-b-4 hover:border-r-2 hover:border-primary hover:rounded-xl transition duration-300 "
    >
      <Card className="flex flex-col items-center justify-between h-[350px]">
        <CardHeader className="gap-4 items-center w-full ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <MdLocationPin className="size-5 text-primary" />
              <span className="text-sm text-neutral-300">
                {event.location ? event.location : 'Online'}
              </span>
            </div>
            <div>
              <Badge
                className="text-base"
                variant={`${event.price ? 'secondary' : 'success'}`}
              >
                {event.price ? event.price + ' $' : 'FREE'}
              </Badge>
            </div>
          </div>

          <CardTitle className="text-2xl font-semibold text-center text-neutral-300">
            {event.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="uppercase text-xs font-semibold text-neutral-500">
              Type
            </span>
            <span className="text-amber-500 text-sm leading-tight ">
              {event.isOnline ? 'Online' : 'In person'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="uppercase text-xs font-semibold text-neutral-500">
              Capacity
            </span>
            <span className="text-amber-500 text-sm leading-tight ">
              {event.capacity ? event.capacity : 'No Limit'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="uppercase text-xs font-semibold text-neutral-500">
              Start Date
            </span>
            <span className="text-amber-500 text-sm leading-tight ">
              {formattedStartDate}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="uppercase text-xs font-semibold text-neutral-500">
              End Date
            </span>
            <span className="text-amber-500 text-sm leading-tight ">
              {formattedEndDate}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-neutral-500 text-center">
            {event.description
              ? event.description.slice(0, 60) + '...'
              : 'See more information about this event'}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
