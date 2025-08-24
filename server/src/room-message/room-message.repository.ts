import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageType, MediaType } from '../../generated/prisma';

@Injectable()
export class RoomMessageRepository {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    roomId: string,
    userId: string,
    content?: string,
    type: MessageType = MessageType.TEXT,
    mediaUrl?: string,
    mediaType?: MediaType,
  ) {
    return this.prisma.message.create({
      data: { roomId, userId, content, type, mediaUrl, mediaType },
      include: {
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async getMessages(roomId: string, limit = 50, cursor?: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
  }
}
