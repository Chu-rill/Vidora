import { Injectable } from '@nestjs/common';
import { MessageType, MediaType } from '../../generated/prisma';
import { RoomMessageRepository } from './room-message.repository';

@Injectable()
export class RoomMessageService {
  constructor(private readonly roomMessageRepository: RoomMessageRepository) {}

  async sendMessage(
    roomId: string,
    userId: string,
    content?: string,
    type: MessageType = MessageType.TEXT,
    mediaUrl?: string,
    mediaType?: MediaType,
  ) {
    // Business rules example: prevent empty messages unless media
    if (!content && !mediaUrl) {
      throw new Error('Message must have content or media');
    }

    return this.roomMessageRepository.createMessage(
      roomId,
      userId,
      content,
      type,
      mediaUrl,
      mediaType,
    );
  }

  async getRoomMessages(roomId: string, limit = 50, cursor?: string) {
    return this.roomMessageRepository.getMessages(roomId, limit, cursor);
  }
}
