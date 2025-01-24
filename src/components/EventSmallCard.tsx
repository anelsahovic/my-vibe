import { Card } from './ui/card';
import { IoLocationSharp } from 'react-icons/io5';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { calculateDaysUntilStart } from '@/util/helperFunctions';
import { EventSmallCardType } from '@/lib/types';

type Props = {
  event: EventSmallCardType;
};

export default function EventSmallCard({ event }: Props) {
  if (!event) {
    return;
  }
  return (
    <Link href={`/events/${event.id}`} className="w-full  hover:bg-primary">
      <Card className="flex flex-col items-start w-full p-2 bg-card-foreground shadow-sm border overflow-hidden">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <IoLocationSharp className="text-base text-blue-400" />
          <p className="text-neutral-400">{event.location}</p>
        </div>

        {/* Event Name */}
        <h3 className="text-sm font-semibold text-neutral-300 truncate mt-1">
          {event.name}
        </h3>

        {/* price and date */}
        <div className="flex items-center justify-between w-full mt-2">
          {/* Price Badge */}
          {event.price ? (
            <Badge variant="secondary" className="text-xs">
              ${event.price.toFixed(2)}
            </Badge>
          ) : (
            <Badge variant="success" className="text-xs">
              FREE
            </Badge>
          )}

          {/* days left */}
          <div className="flex flex-col items-center text-xs text-neutral-300">
            <Badge>
              {calculateDaysUntilStart(event.startDate.toLocaleDateString())}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
