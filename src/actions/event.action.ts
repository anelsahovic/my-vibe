'use server';

import { eventSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { getDbUser, getDbUserId } from './user.action';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getEvents() {
  try {
    return await prisma.event.findMany();
  } catch (error) {
    console.error('Error getting events', error);
  }
}

export async function getEventById(eventId: string) {
  try {
    return prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createEvent(prevState: unknown, formData: FormData) {
  const user = await getDbUser();

  const submission = parseWithZod(formData, { schema: eventSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.event.create({
      data: {
        organizerId: user.id,
        name: submission.value.name,
        description: submission.value.description,
        location: submission.value.location,
        startDate: submission.value.startDate,
        endDate: submission.value.endDate,
        isOnline: submission.value.isOnline,
        capacity: submission.value.capacity,
        price: submission.value.price,
      },
    });

    revalidatePath('/events');
    return { status: 'success' as const };
  } catch (error) {
    return {
      status: 'error' as const,
      error: {
        error: error,
      } as Record<string, string[] | null>,
    };
  }
}

export async function updateEvent(prevState: unknown, formData: FormData) {
  const user = await getDbUser();

  const submission = parseWithZod(formData, { schema: eventSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.event.update({
      where: {
        id: formData.get('eventId') as string,
        organizerId: user.id,
      },
      data: {
        organizerId: user.id,
        name: submission.value.name,
        description: submission.value.description,
        location: submission.value.location,
        startDate: submission.value.startDate,
        endDate: submission.value.endDate,
        isOnline: submission.value.isOnline,
        capacity: submission.value.capacity,
        price: submission.value.price,
      },
    });

    revalidatePath('/events');
    return { status: 'success' as const };
  } catch (error) {
    return {
      status: 'error' as const,
      error: {
        error: error,
      } as Record<string, string[] | null>,
    };
  }
}

export async function deleteEvent(eventId: string) {
  const userId = await getDbUserId();

  try {
    await prisma.event.delete({
      where: {
        id: eventId,
        organizerId: userId,
      },
    });
    revalidatePath('/events');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete event:', error);
    return { success: false, error: 'Failed to delete event' };
  }
}

export async function toggleAttend(eventId: string) {
  try {
    const authUserId = await getDbUserId();
    const event = await getEventById(eventId);

    const isAttending = await prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: authUserId,
        },
      },
    });

    if (isAttending) {
      // cancel attendance
      await prisma.eventAttendee.delete({
        where: {
          eventId_userId: {
            eventId: eventId,
            userId: authUserId,
          },
        },
      });
      revalidatePath('/events');
    } else {
      // attend event
      await prisma.$transaction([
        prisma.eventAttendee.create({
          data: {
            eventId: eventId,
            userId: authUserId,
          },
        }),
        prisma.notification.create({
          data: {
            type: 'EVENT',
            userId: event?.organizerId as string, //event creator getting the notification
            creatorId: authUserId, //user attending the event
            eventId: event?.id,
          },
        }),
      ]);

      revalidatePath('/events');
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error attending event' };
  }
}

export async function isAttending(eventId: string) {
  const userId = await getDbUserId();

  try {
    const isAttending = await prisma.eventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: userId,
        },
      },
    });

    return !!isAttending;
  } catch (error) {
    console.error('Error checking attendance', error);
    return false;
  }
}

export async function isOwnEvent(eventId: string) {
  const userId = await getDbUserId();

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    return userId === event?.organizerId;
  } catch (error) {
    console.error('Error checking if it is own event', error);
    return false;
  }
}
