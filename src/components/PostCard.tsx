'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Post, UserDb } from '@/lib/types';
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import {
  createComment,
  deleteComment,
  deletePost,
  toggleLike,
} from '@/actions/post.actions';
import toast from 'react-hot-toast';
import { HeartIcon, MessageCircleIcon, SendIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { DeleteAlertDialog } from './DeleteAlertDialog';
import Image from 'next/image';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import Link from 'next/link';
import { FaClockRotateLeft } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';

type Props = {
  post: Post;
  user: UserDb;
};

export default function PostCard({ post, user }: Props) {
  const { id, createdAt, author, content, image, _count } = post;

  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === user.id)
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === user.id));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;

    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        setNewComment('');
      }
    } catch (error) {
      toast.error('Failed to add comment', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) {
        toast.success('Post deleted successfully', {
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
      console.error('Failed to delete post', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const result = await deleteComment(post.id, commentId);
      if (result.success) {
        toast.success('Comment deleted successfully', {
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
      console.error('Failed to delete comment', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar>
                <AvatarImage src={post.author?.image as string} />
                <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                  {post.author?.name?.[0] || post.author?.username?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              {/* header */}
              <div className="flex items-start justify-between">
                {/* user info */}
                <div className="flex flex-col items-start">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className=" text-neutral-300 font-semibold truncate"
                  >
                    {post.author.name}
                  </Link>

                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <FaClockRotateLeft />
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>

                {/* more options dropdown */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <BsThreeDotsVertical className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="#" className="w-full h-full">
                        See details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="w-full h-full"
                      >
                        See User
                      </Link>
                    </DropdownMenuItem>

                    {user.id === post.author.id && (
                      <DropdownMenuItem asChild>
                        <DeleteAlertDialog
                          isDeleting={isDeleting}
                          onDelete={handleDeletePost}
                          title="Delete Post"
                          buttonText="Delete Post"
                        />
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* post content */}
              <p className="mt-5 text-sm text-foreground break-words">
                {post.content}
              </p>
            </div>
          </div>

          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post content"
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'hover:text-red-500'
                }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span>{optimisticLikes}</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-2"
              >
                <HeartIcon className="size-5" />
                <span>{optimisticLikes}</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-amber-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${
                  showComments ? 'fill-amber-500 text-amber-500' : ''
                }`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-6">
                {/* DISPLAY COMMENTS */}
                <h3>Comments</h3>
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex space-x-3">
                      <Avatar className="size-8">
                        <AvatarImage src={comment.author?.image as string} />
                        <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                          {comment.author?.name?.[0] ||
                            comment.author?.username?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-medium text-base text-neutral-300">
                            {comment.author.name}
                          </span>

                          <span className="text-xs text-neutral-500">
                            {formatDistanceToNow(new Date(comment.createdAt))}{' '}
                            ago
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 break-words">
                          {comment.content}
                        </p>
                      </div>
                    </div>

                    {(user.id === comment.author.id ||
                      user.id === post.author.id) && (
                      <div>
                        <DeleteAlertDialog
                          isDeleting={isDeleting}
                          onDelete={() => handleDeleteComment(comment.id)}
                          title="Delete Comment"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* add new comment */}
              <div className="flex space-x-3">
                <Avatar>
                  <AvatarImage src={user?.image as string} />
                  <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
                    {user?.name?.[0] || user?.username?.[0] || user?.email?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none text-neutral-400"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={handleAddComment}
                      className="flex items-center gap-2"
                      disabled={!newComment.trim() || isCommenting}
                    >
                      {isCommenting ? 'Posting...' : <>Comment</>}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
