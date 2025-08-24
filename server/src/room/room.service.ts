import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { Room } from './validation';
import { RoomGateway } from './room.gateway';
import { RoomMessageService } from 'src/room-message/room-message.service';

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private gateway: RoomGateway,
    private roomMessageService: RoomMessageService,
  ) {}

  async createRoom(createRoomDto: Room, creatorId: string) {
    const { name, description, type, maxParticipants } = createRoomDto;

    const room = await this.roomRepository.createRoom(
      name,
      description!,
      type!,
      maxParticipants!,
      creatorId,
    );

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Room created successfully',
      data: room,
    };
  }

  async getAllRooms(page: number = 1, limit: number = 10) {
    const { rooms, total } = await this.roomRepository.getAllRooms(page, limit);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Room retrieved successfully',
      data: {
        rooms,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getRoomById(id: string) {
    const room = await this.roomRepository.getRoomById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Room retrieved successfully',
      data: room,
    };
  }

  async joinRoom(roomId: string, userId: string) {
    const room = await this.roomRepository.getRoomById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.participants.length >= room.maxParticipants) {
      throw new BadRequestException('Room is full');
    }

    const newMember = await this.roomRepository.joinRoom(roomId, userId);

    const systemMessage = await this.roomMessageService.sendSystemMessage(
      roomId,
      `User ${userId} joined the room`,
      userId,
    );

    this.gateway.server.to(roomId).emit('room:userJoined', systemMessage);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Joined room successfully',
      data: newMember,
    };
  }

  async leaveRoom(roomId: string, userId: string) {
    const room = await this.roomRepository.getRoomById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isParticipant = room.participants.some(
      (participant) => participant.id === userId,
    );

    if (!isParticipant) {
      throw new BadRequestException('You are not a participant of this room');
    }

    const oldMember = await this.roomRepository.leaveRoom(roomId, userId);

    const systemMessage = await this.roomMessageService.sendSystemMessage(
      roomId,
      `User ${userId} left the room`,
      userId,
    );

    this.gateway.server.to(roomId).emit('room:userLeft', systemMessage);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Left room successfully',
      data: oldMember,
    };
  }
}
