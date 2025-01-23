import { getEvents } from '@/actions/event.action';
import EventForm from '@/components/EventForm';
import EventMediumCard from '@/components/EventMediumCard';

// const events = [
//   {
//     id: 'e1',
//     name: 'Tech Innovators Conference',
//     description: 'Join industry leaders to discuss the future of technology.',
//     location: 'Berlin, Germany',
//     startDate: new Date('2025-01-20T09:00:00Z'),
//     endDate: new Date('2025-01-20T17:00:00Z'),
//     isOnline: false,
//     capacity: 500,
//     price: 199.99,
//     organizer: {
//       id: 'u1',
//       name: 'John Doe',
//     },
//     attendees: [
//       { id: 'u2', name: 'Alice Johnson' },
//       { id: 'u3', name: 'Bob Smith' },
//     ],
//   },
//   {
//     id: 'e2',
//     name: 'Web3 Summit',
//     description: 'Explore the possibilities of decentralized web technologies.',
//     location: 'Online',
//     startDate: new Date('2025-02-10T13:00:00Z'),
//     endDate: new Date('2025-02-10T18:00:00Z'),
//     isOnline: true,
//     capacity: 1000,
//     price: 0,
//     organizer: {
//       id: 'u4',
//       name: 'Jane Williams',
//     },
//     attendees: [
//       { id: 'u5', name: 'Michael Brown' },
//       { id: 'u6', name: 'Emily Davis' },
//     ],
//   },
//   {
//     id: 'e3',
//     name: 'Fitness Bootcamp',
//     description:
//       'A weekend to kickstart your fitness journey with top trainers.',
//     location: 'New York City, USA',
//     startDate: new Date('2025-03-01T08:00:00Z'),
//     endDate: new Date('2025-03-02T16:00:00Z'),
//     isOnline: false,
//     capacity: 50,
//     price: 49.99,
//     organizer: {
//       id: 'u7',
//       name: 'Chris Taylor',
//     },
//     attendees: [
//       { id: 'u8', name: 'Sophia Wilson' },
//       { id: 'u9', name: 'Daniel Martinez' },
//     ],
//   },
//   {
//     id: 'e4',
//     name: 'Art Workshop for Beginners',
//     description: 'Learn the basics of painting and sketching from an expert.',
//     location: 'Paris, France',
//     startDate: new Date('2025-03-15T10:00:00Z'),
//     endDate: new Date('2025-03-15T15:00:00Z'),
//     isOnline: false,
//     capacity: 20,
//     price: 30.0,
//     organizer: {
//       id: 'u10',
//       name: 'Laura Lee',
//     },
//     attendees: [],
//   },
//   {
//     id: 'e5',
//     name: 'Entrepreneurship Bootcamp',
//     description: 'A hands-on workshop to refine your business ideas.',
//     location: 'San Francisco, USA',
//     startDate: new Date('2025-04-05T10:00:00Z'),
//     endDate: new Date('2025-04-05T17:00:00Z'),
//     isOnline: false,
//     capacity: 100,
//     price: 99.99,
//     organizer: {
//       id: 'u11',
//       name: 'Peter Green',
//     },
//     attendees: [
//       { id: 'u12', name: 'Olivia Clark' },
//       { id: 'u13', name: 'James Walker' },
//     ],
//   },
// ];

export default async function EventsRoute() {
  const events = await getEvents();

  if (!events) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        No events available.
      </div>
    );
  }
  return (
    <div className="container py-10 flex flex-col gap-10">
      <div className="flex justify-end w-full">
        <div>
          <EventForm />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventMediumCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
