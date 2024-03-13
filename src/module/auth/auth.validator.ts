import * as z from 'zod';

export const registerUserValidator = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const loginUserValidator = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type RegisterUserType = z.infer<typeof registerUserValidator>;
export type LoginUserType = z.infer<typeof loginUserValidator>;
