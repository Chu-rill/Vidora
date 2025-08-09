// validation.ts - Add query validation schemas
import { z } from 'zod';

// Existing schemas...
export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().nullable().optional(),
  isOnline: z.boolean().optional(),
  lastSeen: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().nullable().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  avatar: z.string().nullable().optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

// Query validation schema
export const GetUsersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  isOnline: z.coerce.boolean().optional(),
  sortBy: z.enum(['username', 'email', 'createdAt', 'lastSeen']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type GetUsersQueryDto = z.infer<typeof GetUsersQuerySchema>;
