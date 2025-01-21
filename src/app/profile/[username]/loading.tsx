import { Loader2 } from 'lucide-react';
import React from 'react';

export default function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center gap-1 text-primary">
        <span>
          <Loader2 className="size-6 animate-spin" />
        </span>
        <h1>Loading profile...</h1>
      </div>
    </div>
  );
}
