import { z } from 'zod';

// Zod validation for Prisma Room model
export const RoomSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.enum(['PUBLIC', 'PRIVATE']).optional(),
  creatorId: z.string(),
  maxParticipants: z.number().int().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Room = z.infer<typeof RoomSchema>;

export const CreateRoom = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateRoom = z.infer<typeof CreateRoom>;
