import {
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  Get,
  Body,
  Request,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  // Send friend request
  @Post(':receiverId')
  async addFriend(@Param('receiverId') receiverId: string, @Request() req) {
    const requesterId = req.user.id; // assuming user is injected by auth guard
    return this.friendshipService.addFriend(requesterId, receiverId);
  }

  // Accept friend request
  @Patch(':id/accept')
  async acceptFriendship(@Param('id') friendshipId: string) {
    return this.friendshipService.acceptFriendship(friendshipId);
  }

  // Block a friendship
  @Patch(':id/block')
  async blockFriendship(@Param('id') friendshipId: string) {
    return this.friendshipService.blockFriendship(friendshipId);
  }

  // List friends for a given user
  @Get('me')
  async listMyFriends(@Request() req) {
    const userId = req.user.id; // current logged-in user
    return this.friendshipService.listFriends(userId);
  }

  // Optional: remove a friendship
  @Delete(':id')
  async remove(@Param('id') friendshipId: string) {
    return this.friendshipService.blockFriendship(friendshipId);
    // or implement a dedicated "removeFriendship" in service/repo
  }
}
