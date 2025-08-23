import { Injectable } from '@nestjs/common';
import { FriendshipRepository } from './friendship.repository';
import { FriendStatus } from '../../generated/prisma';

@Injectable()
export class FriendshipService {
  constructor(private readonly friendshipRepository: FriendshipRepository) {}

  async addFriend(requesterId: string, receiverId: string) {
    return this.friendshipRepository.sendFriendRequest(requesterId, receiverId);
  }

  async acceptFriendship(friendshipId: string) {
    return this.friendshipRepository.respondToRequest(
      friendshipId,
      FriendStatus.ACCEPTED,
    );
  }

  async blockFriendship(friendshipId: string) {
    return this.friendshipRepository.respondToRequest(
      friendshipId,
      FriendStatus.BLOCKED,
    );
  }

  async listFriends(userId: string) {
    return this.friendshipRepository.getFriends(userId);
  }
}
