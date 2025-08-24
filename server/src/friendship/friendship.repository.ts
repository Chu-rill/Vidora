import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendStatus } from '../../generated/prisma';

@Injectable()
export class FriendshipRepository {
  constructor(private prisma: PrismaService) {}

  async sendFriendRequest(requesterId: string, receiverId: string) {
    return this.prisma.friendship.create({
      data: { requesterId, receiverId },
    });
  }

  async respondToRequest(friendshipId: string, status: FriendStatus) {
    return this.prisma.friendship.update({
      where: { id: friendshipId },
      data: { status },
    });
  }

  async getFriends(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        OR: [
          { requesterId: userId, status: FriendStatus.ACCEPTED },
          { receiverId: userId, status: FriendStatus.ACCEPTED },
        ],
      },
      include: { requester: true, receiver: true },
    });
  }
}
