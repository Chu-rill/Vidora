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
export class RoomParticipantGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const roomId = request.params.roomId || request.body.roomId;
    if (!roomId) {
      throw new ForbiddenException('Room ID is required');
    }

    // Fetch room with creator + participants
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { participants: { select: { id: true } } },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Check if user is creator OR in participants
    const isParticipant =
      room.creatorId === user.id ||
      room.participants.some((p) => p.id === user.id);

    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this room');
    }

    return true;
  }
}
