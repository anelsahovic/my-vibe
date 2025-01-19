'use server';

import prisma from '@/lib/prisma';
import { postSchema } from '@/lib/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { getDbUser } from './user.action';
import { revalidatePath } from 'next/cache';

export async function createPost(prevState: unknown, formData: FormData) {
  const user = await getDbUser();

  // compare 1st and 2nd argument (form data and zod schema)
  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  // Return validation errors if not successful
  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    await prisma.post.create({
      data: {
        authorId: user.id,
        content: submission.value.content,
        image: submission.value.image,
      },
    });
    revalidatePath('/home');
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
