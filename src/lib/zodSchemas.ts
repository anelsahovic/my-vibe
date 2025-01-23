import { z } from 'zod';

export const postSchema = z.object({
  content: z
    .string()
    .min(2, 'Minimum post length is 2 characters')
    .max(256, 'Maximum post length is 256 characters')
    .optional(),
  image: z.string().optional(),
});

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Min name length is 2 characters')
    .max(20, 'Max name length is 20 characters')
    .optional(),
  username: z
    .string()
    .min(2, 'Min username length is 2 characters')
    .max(20, 'Max username length is 20 characters'),
  email: z.string().email(),
  bio: z.string().max(256, 'Max bio length is 256 characters').optional(),
  location: z
    .string()
    .max(30, 'Max location length is 30 characters')
    .optional(),
  website: z.string().url().optional(),
});

export const eventSchema = z.object({
  name: z.string().min(2, 'Minimum name length is 2 characters'),
  description: z
    .string()
    .max(400, 'Maximum description length is 400 characters')
    .optional(),
  location: z
    .string()
    .max(30, 'Max location length is 30 characters')
    .optional(),
  startDate: z.string(),
  endDate: z.string(),
  isOnline: z.boolean().optional(),
  capacity: z.number().optional(),
  price: z.number().optional(),
});
