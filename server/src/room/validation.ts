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

export const CreateRoomSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['PUBLIC', 'PRIVATE']).optional(),
});

export type CreateRoomDto = z.infer<typeof CreateRoomSchema>;

export const GetRoomsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type GetRoomsQueryDto = z.infer<typeof GetRoomsQuerySchema>;
