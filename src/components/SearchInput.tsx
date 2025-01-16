import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Input } from './ui/input';

export default function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex items-center justify-end w-full">
      {/* Small screens */}
      <div className="flex lg:hidden relative">
        {!isExpanded ? (
          <button
            onClick={toggleSearch}
            className=" hover:text-primary transition duration-300 p-2"
          >
            <FiSearch className="size-5" />
          </button>
        ) : (
          <div className=" flex items-center gap-2">
            <Input
              type="text"
              className="rounded-full w-full"
              placeholder="Search..."
            />
            <button
              onClick={toggleSearch}
              className=" absolute right-4 top-1.5 hover:text-primary transition duration-300"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Medium and larger screens */}
      <div className="hidden lg:flex items-center justify-center relative w-full">
        <button className="absolute right-4 top-2 hover:text-primary transition duration-300">
          <FiSearch className=" size-5" />
        </button>
        <Input
          type="text"
          className="w-full rounded-full"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
