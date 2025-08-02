import {
  PrismaClient,
  Room as PrismaRoom,
  User as PrismaUser,
} from "../../generated/prisma";
import { IRoom } from "../types";

const prisma = new PrismaClient();

export class RoomRepository {
  async create(roomData: Partial<IRoom>): Promise<PrismaRoom> {
    // Assume roomData.creator is the creatorId and participants is an array of user IDs
    const { creator, participants, ...rest } = roomData as any;
    return await prisma.room.create({
      data: {
        ...rest,
        creator: { connect: { id: creator } },
        participants: participants
          ? { connect: participants.map((id: string) => ({ id })) }
          : undefined,
      },
    });
  }

  async findById(
    id: string
  ): Promise<
    | (PrismaRoom & {
        creator: { username: string; email: string };
        participants: PrismaUser[];
      })
    | null
  > {
    return await prisma.room.findUnique({
      where: { id },
      include: {
        creator: { select: { username: true, email: true } },
        participants: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<PrismaRoom[]> {
    const skip = (page - 1) * limit;
    return await prisma.room.findMany({
      where: { isActive: true },
      skip,
      take: limit,
      include: {
        creator: { select: { username: true, email: true } },
        participants: true,
      },
    });
  }

  async findByCreator(creatorId: string): Promise<PrismaRoom[]> {
    return await prisma.room.findMany({
      where: { creatorId, isActive: true },
      include: { participants: true },
    });
  }

  async updateById(
    id: string,
    updateData: Partial<IRoom>
  ): Promise<PrismaRoom | null> {
    const { participants, ...rest } = updateData as any;
    return await prisma.room.update({
      where: { id },
      data: {
        ...rest,
        ...(participants && {
          participants: { set: participants.map((id: string) => ({ id })) },
        }),
      },
    });
  }

  async deleteById(id: string): Promise<PrismaRoom | null> {
    // Soft delete: set isActive to false
    return await prisma.room.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async addParticipant(
    roomId: string,
    userId: string
  ): Promise<PrismaRoom | null> {
    return await prisma.room.update({
      where: { id: roomId },
      data: {
        participants: { connect: { id: userId } },
      },
    });
  }

  async removeParticipant(
    roomId: string,
    userId: string
  ): Promise<PrismaRoom | null> {
    return await prisma.room.update({
      where: { id: roomId },
      data: {
        participants: { disconnect: { id: userId } },
      },
    });
  }
}
