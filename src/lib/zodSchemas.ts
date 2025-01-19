import { z } from 'zod';

export const postSchema = z.object({
  content: z
    .string()
    .min(2, 'Minimum post length is 2 characters')
    .max(256, 'Maximum post length is 256 characters')
    .optional(),
  image: z.string().optional(),
});
