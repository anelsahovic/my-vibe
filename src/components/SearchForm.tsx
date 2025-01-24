import Form from 'next/form';
import { IoSearch } from 'react-icons/io5';

type Props = {
  page: string;
};

export default function SearchForm({ page }: Props) {
  return (
    <Form
      action={page}
      className="flex items-center justify-center w-full search-form"
      scroll={false}
    >
      <div className="relative w-full ">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-full text-neutral-300 text-sm placeholder-neutral-500 bg-card-foreground shadow-md focus:outline-none focus:ring-2 sm:focus:ring-2 focus:ring-primary transition-all duration-300"
          name="search"
        />

        <div className="absolute  top-1/2 -translate-y-1/2 right-2 flex items-center justify-between gap-1">
          <button
            className="flex items-center justify-center bg-[var(--color-primary)] size-8 sm:size-10 rounded-full text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-300"
            type="submit"
          >
            <IoSearch />
          </button>
        </div>
      </div>
    </Form>
  );
}
