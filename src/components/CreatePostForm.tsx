'use client';

import { useActionState, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SubmitButton from './SubmitButton';
import { Button } from './ui/button';
import { IoImageOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { UserDb } from '@/lib/types';
import { createPost } from '@/actions/post.actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { postSchema } from '@/lib/zodSchemas';

type Props = {
  user: UserDb;
};

export default function CreatePostForm({ user }: Props) {
  const [postContent, setPostContent] = useState<string>('');
  const [wordsCount, setWordsCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPosting, setIsPosting] = useState(false);
  const maxContentLength: number = 256;

  const handlePostContent = (content: string) => {
    setPostContent((prevContent) =>
      content.length <= maxContentLength ? content : prevContent
    );
    setWordsCount(
      content.length <= maxContentLength ? content.length : maxContentLength
    );
  };

  const [lastResult, action] = useActionState(createPost, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast.success('Post created successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      setPostContent('');
    }
  }, [lastResult]);

  return (
    <Card className="flex p-4 w-full ">
      <form
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
        noValidate
        className="flex flex-col gap-4 w-full"
      >
        <div className="relative  w-full">
          <Avatar className="absolute top-2 left-2">
            <AvatarImage src={user.image as string} />
            <AvatarFallback className="uppercase bg-primary w-full text-neutral-300 font-bold">
              {user.name?.[0] || user.username?.[0] || user.email?.[0]}
            </AvatarFallback>
          </Avatar>

          <Textarea
            value={postContent}
            onChange={(e) => handlePostContent(e.target.value)}
            className="w-full h-[100px] p-4 pl-14  bg-card-foreground rounded-lg resize-none text-neutral-300 "
            placeholder="Whats on your mind?"
            disabled={isPosting}
            name={fields.content.name}
            key={fields.content.key}
            // defaultValue={fields.content.initialValue as string}
          />
          <p className="absolute bottom-1 left-2 text-xs text-neutral-400">
            {fields.content.errors}
          </p>
          <div className="absolute bottom-1 right-2 text-sm text-neutral-400">
            {wordsCount}/{maxContentLength}
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-primary "
              disabled={isPosting}
            >
              <IoImageOutline />
              Image
            </Button>
          </div>
          <div>
            <SubmitButton disabled={!postContent} text="Post" icon={FiSend} />
          </div>
        </div>
      </form>
    </Card>
  );
}
