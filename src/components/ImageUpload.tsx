'use client';

import { UploadDropzone } from '@/util/uploadthing';
import { XIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  onChange: (url: string) => void;
  value: string;
  endpoint: 'postImage';
};

export default function ImageUpload({ value, onChange, endpoint }: Props) {
  if (value) {
    return (
      <div className="relative size-40">
        <div className="rounded-md size-40 relative">
          <Image
            src={value}
            alt="Upload"
            className="rounded-md object-cover"
            fill={true}
          />
        </div>
        <button
          onClick={() => onChange('')}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
