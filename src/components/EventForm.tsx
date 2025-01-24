'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { createEvent } from '@/actions/event.action';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { eventSchema } from '@/lib/zodSchemas';
import toast from 'react-hot-toast';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Switch } from './ui/switch';
import SubmitButton from './SubmitButton';

export default function EventForm() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);

  const [lastResult, action] = useActionState(createEvent, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Event created successfully!', {
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
        <Button className="w-full">
          <FaRegCalendarPlus className="size-4 mr-2" />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full sm:h-[90%]  overflow-y-auto sm:overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate
          className="space-y-4 py-4"
        >
          <div className="space-y-2">
            <Label>Event name</Label>
            <Input
              name={fields.name.name}
              key={fields.name.key}
              defaultValue={fields.name.initialValue as string}
              placeholder="Fitness Bootcamp"
            />
            <p className=" text-xs text-red-500">{fields.name.errors}</p>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name={fields.description.name}
              key={fields.description.key}
              defaultValue={fields.description.initialValue as string}
              className="min-h-[100px]"
              placeholder="A weekend to kickstart your fitness journey with top trainers."
            />
            <p className=" text-xs text-red-500">{fields.description.errors}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                name={fields.location.name}
                key={fields.location.key}
                defaultValue={fields.location.initialValue as string}
                placeholder="New York City, USA"
              />
              <p className=" text-xs text-red-500">{fields.location.errors}</p>
            </div>

            <div className="flex flex-col justify-end space-y-2">
              <div className="flex items-center justify-between  rounded-md p-2 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col space-y-2">
                  <Label className="">Online</Label>
                  <p className="text-xs text-neutral-500">
                    Is the event hosted online?
                  </p>
                </div>
                <Switch
                  checked={isOnlineEvent}
                  onCheckedChange={(checked) => setIsOnlineEvent(checked)}
                  name={fields.isOnline.name}
                  key={fields.isOnline.key}
                />
              </div>
              <p className=" text-xs text-red-500">{fields.isOnline.errors}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input
                type="number"
                name={fields.capacity.name}
                key={fields.capacity.key}
                defaultValue={fields.capacity.initialValue as string}
                placeholder="12"
              />
              <p className=" text-xs text-red-500">{fields.capacity.errors}</p>
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <div className="relative">
                <Input
                  type="number"
                  name={fields.price.name}
                  key={fields.price.key}
                  defaultValue={fields.price.initialValue as string}
                  placeholder="100"
                  className="pr-12"
                />
                <span className="absolute inset-y-0 right-0 flex items-center justify-center bg-card w-10 rounded-r-md">
                  $
                </span>
              </div>

              <p className=" text-xs text-red-500">{fields.price.errors}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 flex flex-col">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className=" justify-start text-left"
                  >
                    <CalendarIcon />
                    {selectedStartDate
                      ? `${selectedStartDate.toLocaleDateString()}`
                      : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedStartDate}
                    onSelect={(date) =>
                      setSelectedStartDate(date || new Date())
                    }
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name={fields.startDate.name}
                key={fields.startDate.key}
                value={selectedStartDate.toISOString()}
              />
              <p className=" text-xs text-red-500">{fields.startDate.errors}</p>
            </div>
            <div className="space-y-2 flex flex-col">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon />
                    {selectedEndDate
                      ? `${selectedEndDate.toLocaleDateString()}`
                      : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedEndDate}
                    onSelect={(date) => setSelectedEndDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name={fields.endDate.name}
                key={fields.endDate.key}
                value={selectedEndDate.toISOString()}
              />
              <p className=" text-xs text-red-500">{fields.endDate.errors}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <div>
              <SubmitButton text="Finish" />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
