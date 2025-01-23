import { getEventById } from '@/actions/event.action';
import EventLargeCard from '@/components/EventLargeCard';
import { notFound } from 'next/navigation';

export type Event = Awaited<ReturnType<typeof getEventById>>;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const event: Event = await getEventById(id);

  if (!event) {
    return notFound();
  }
  return (
    <div className="flex w-full h-full justify-center items-center container py-5">
      <EventLargeCard event={event} />
    </div>
  );
}
