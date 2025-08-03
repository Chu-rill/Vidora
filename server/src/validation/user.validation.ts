import { z } from "zod";

// Zod validation for Prisma User model
export const userValidation = z.object({
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

export type User = z.infer<typeof userValidation>;

export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().nullable().optional(),
});

export type createUserDto = z.infer<typeof createUserSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type loginDto = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  id: z.string().cuid(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  avatar: z.string().nullable().optional(),
});

export type updateUserDto = z.infer<typeof updateUserSchema>;
