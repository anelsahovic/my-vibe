import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import CreatePostForm from './CreatePostForm';
import { UserDb } from '@/lib/types';
import { IoCreateOutline } from 'react-icons/io5';

type Props = {
  user: UserDb;
};

export default function CreatePostDialog({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center space-x-1">
        <IoCreateOutline className="size-6" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <CreatePostForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
