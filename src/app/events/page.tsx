import { getEvents } from '@/actions/event.action';
import EventForm from '@/components/EventForm';
import EventMediumCard from '@/components/EventMediumCard';
import SearchForm from '@/components/SearchForm';
import SearchFormReset from '@/components/SearchFormReset';

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

type Props = {
  searchParams: Promise<{ search: string }>;
};

export default async function EventsRoute({ searchParams }: Props) {
  const { search } = await searchParams;
  const events = await getEvents();

  if (!events) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        No events available.
      </div>
    );
  }

  const filteredEvents = events.filter(
    (event) =>
      search && event.name?.toLowerCase().includes(search.toLowerCase())
  );

  const eventsToDisplay = search ? filteredEvents : events;

  return (
    <div className="container py-10 flex flex-col justify-center items-center gap-10 mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <div className="sm:w-[500px] ">
          <SearchForm page="/events" />
        </div>
        <div>
          <EventForm />
        </div>
      </div>

      <div className="w-full flex justify-center sm:justify-start">
        {search ? (
          <div className="flex items-center gap-2">
            <p className="text-center">
              Showing results for{'  '}
              <span className="font-semibold">&quot;{search}&quot;</span>
            </p>
            <SearchFormReset page="/events" />
          </div>
        ) : (
          <p className="text-center">Showing all events</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {eventsToDisplay.length ? (
          eventsToDisplay.map((event) => (
            <EventMediumCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
}
