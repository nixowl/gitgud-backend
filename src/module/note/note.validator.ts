import * as z from 'zod';

export const noteValidator = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(3, 'Content must be at least 3 characters long'),
  status: z.string().optional(),
  icon: z.string().optional(),
});

export type NoteValidator = z.infer<typeof noteValidator>;
