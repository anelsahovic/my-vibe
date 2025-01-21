'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { EditIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { updateUser } from '@/actions/user.action';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { userSchema } from '@/lib/zodSchemas';
import toast from 'react-hot-toast';
import { UserDb } from '@/lib/types';

type Props = {
  user: UserDb;
};

export default function ProfileForm({ user }: Props) {
  const [lastResult, action] = useActionState(updateUser, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Profile updated successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }, [lastResult]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">
          <EditIcon className="size-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate
          className="space-y-4 py-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={
                  user.name ? user.name : (fields.name.initialValue as string)
                }
                placeholder="Your name"
              />
              <p className=" text-xs text-red-500">{fields.name.errors}</p>
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                name={fields.username.name}
                key={fields.username.key}
                defaultValue={
                  user.username
                    ? user.username
                    : (fields.username.initialValue as string)
                }
                placeholder="Your username"
              />
              <p className=" text-xs text-red-500">{fields.username.errors}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              name={fields.email.name}
              key={fields.email.key}
              defaultValue={
                user.email ? user.email : (fields.email.initialValue as string)
              }
              placeholder="Your email"
            />
            <p className=" text-xs text-red-500">{fields.email.errors}</p>
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              name={fields.bio.name}
              key={fields.bio.key}
              defaultValue={
                user.bio ? user.bio : (fields.bio.initialValue as string)
              }
              className="min-h-[100px]"
              placeholder="Tell us about yourself"
            />
            <p className=" text-xs text-red-500">{fields.bio.errors}</p>
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              name={fields.location.name}
              key={fields.location.key}
              defaultValue={
                user.location
                  ? user.location
                  : (fields.location.initialValue as string)
              }
              placeholder="Where are you based?"
            />
            <p className=" text-xs text-red-500">{fields.location.errors}</p>
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              name={fields.website.name}
              key={fields.website.key}
              defaultValue={
                user.website
                  ? user.website
                  : (fields.website.initialValue as string)
              }
              placeholder="Your personal website"
            />
            <p className=" text-xs text-red-500">{fields.website.errors}</p>
          </div>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
