import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRequest } from '../types/auth.request';

@Injectable()
export class RoomAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Get the roomId from request (could be from params or body depending on your routes)
    const roomId = request.params.roomId || request.body.roomId;
    if (!roomId) {
      throw new ForbiddenException('Room ID is required');
    }

    // Find room
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { id: true, creatorId: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Check if the user is the creator
    if (room.creatorId !== user.id) {
      throw new ForbiddenException(
        'Only the room creator can perform this action',
      );
    }

    return true;
  }
}
