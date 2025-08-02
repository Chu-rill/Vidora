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

// deleteUserValidation validator schema
export const loginValidation = z.object({
  id: z.string().cuid(),
});
export const registerValidation = z.object({
  id: z.string().cuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
export const createRoomValidation = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});

// uploadProfile validator schema
export const uploadProfile = z.object({
  profile: z.string(),
});

// updateUserValidation validator schema
export const updateUserValidation = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
});
