import { z } from "zod";

// Zod validation for Prisma Room model
export const roomValidation = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  type: z.enum(["PUBLIC", "PRIVATE"]).optional(),
  creatorId: z.string(),
  maxParticipants: z.number().int().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type RoomValidationType = z.infer<typeof roomValidation>;

export const createRoom = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});
