import { z } from 'zod';

// Signup validator schema
export const SignupSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
});

export type SignupDto = z.infer<typeof SignupSchema>;

// Login validator schema
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type ßLoginDto = z.infer<typeof LoginSchema>;
