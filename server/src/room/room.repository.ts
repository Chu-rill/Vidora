import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  async createRoom(
    name: string,
    description: string,
    type: string,
    maxParticipants: number,
    creatorId: string,
  ) {
    const room = await this.prisma.room.create({
      data: {
        name,
        description,
        type,
        creatorId,
        maxParticipants,
        participants: {
          connect: { id: creatorId },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return room;
  }

  async getAllRooms(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [rooms, total] = await Promise.all([
      this.prisma.room.findMany({
        skip,
        take: limit,
        include: {
          participants: {
            select: {
              id: true,
              username: true,
              email: true,
              avatar: true,
            },
          },
          creator: {
            select: {
              id: true,
              username: true,
              email: true,
              avatar: true,
            },
          },
        },
      }),
      this.prisma.room.count(),
    ]);

    return { rooms, total };
  }

  async getRoomById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return room;
  }

  async joinRoom(roomId: string, userId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        participants: {
          connect: { id: userId },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return room;
  }

  async leaveRoom(roomId: string, userId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        participants: {
          disconnect: { id: userId },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    return room;
  }
}
