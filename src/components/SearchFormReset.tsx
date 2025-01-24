'use client';

import Link from 'next/link';

type Props = {
  page: string;
};

export default function SearchFormReset({ page }: Props) {
  const resetForm = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button
      className="flex items-center justify-center hover:opacity-80 transition-all duration-300"
      type="submit"
      onClick={resetForm}
    >
      <Link
        className="text-xs uppercase text-primary whitespace-nowrap"
        href={page}
      >
        Reset
      </Link>
    </button>
  );
}
