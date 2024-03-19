import * as z from 'zod';

export const updateUserValidator = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export type UpdateUserType = z.infer<typeof updateUserValidator>;
