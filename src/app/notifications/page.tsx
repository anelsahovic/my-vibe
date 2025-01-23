'use client';

import {
  deleteNotification,
  getNotifications,
  markNotificationsAsRead,
} from '@/actions/notification.action';
import { DeleteAlertDialog } from '@/components/DeleteAlertDialog';
import { NotificationsSkeleton } from '@/components/NotificationSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdEventNote } from 'react-icons/md';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'LIKE':
      return <HeartIcon className="size-4 text-red-500" />;
    case 'COMMENT':
      return <MessageCircleIcon className="size-4 text-amber-500" />;
    case 'FOLLOW':
      return <UserPlusIcon className="size-4 text-green-500" />;
    case 'EVENT':
      return <MdEventNote className="size-4 text-sky-500" />;
    default:
      return null;
  }
};
const getNotificationText = (type: string) => {
  switch (type) {
    case 'LIKE':
      return <p>started following you</p>;
    case 'COMMENT':
      return <p>liked your post</p>;
    case 'FOLLOW':
      return <p>commented on your post</p>;
    case 'EVENT':
      return <p>is attending your event</p>;
    default:
      return <p>N/A</p>;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);

        const unreadIds = data.filter((n) => !n.read).map((n) => n.id);

        if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
      } catch (error) {
        console.error('Error fetching notifications', error);
        toast.error('Failed to fetch notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (notificationId: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const result = await deleteNotification(notificationId);

      if (result.success) {
        // Update the state by filtering out the deleted notification
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );

        toast.success('Notification deleted successfully', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to delete notification', error);
      toast.error('Failed to delete notification');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="container py-4  space-y-4 mx-auto">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <span className="text-sm text-muted-foreground">
              {notifications.filter((n) => !n.read).length > 0
                ? notifications.filter((n) => !n.read).length + ' unread'
                : 'All caught up!'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
                    !notification.read ? 'bg-muted/50' : ''
                  }`}
                >
                  <Link href={`/profile/${notification.creator.username}`}>
                    <Avatar>
                      <AvatarImage
                        src={notification.creator?.image as string}
                      />
                      <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                        {notification.creator?.name?.[0] ||
                          notification.creator?.username?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span className="font-medium text-sm md:text-base">
                        <Link
                          href={`/profile/${notification.creator.username}`}
                        >
                          <span className="font-medium text-sm md:text-base">
                            {notification.creator.name ??
                              notification.creator.username}
                          </span>
                        </Link>{' '}
                        {getNotificationText(notification.type)}
                      </span>
                    </div>

                    {notification.post &&
                      (notification.type === 'LIKE' ||
                        notification.type === 'COMMENT') && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                            <Link href={`/post/${notification.post.id}`}>
                              <p>{notification.post.content}</p>
                            </Link>
                            {notification.post.image && (
                              <div className="mt-2 rounded-md w-full max-w-[200px] h-auto relative">
                                <Image
                                  src={notification.post.image}
                                  alt="Post content"
                                  className="rounded-md object-cover"
                                  fill={true}
                                />
                              </div>
                            )}
                          </div>

                          {notification.type === 'COMMENT' &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-accent/50 rounded-md italic">
                                {`" ${notification.comment.content} "`}
                              </div>
                            )}
                        </div>
                      )}

                    {notification.eventId && (
                      <div className="pl-6 space-y-2">
                        <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                          <Link href={`/events/${notification.eventId}`}>
                            <p>{notification.event?.name}</p>
                          </Link>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div>
                    <DeleteAlertDialog
                      title="Delete Notification"
                      isDeleting={isDeleting}
                      onDelete={() => handleDeleteNotification(notification.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
