import { RoomRepository } from "./room.repository";
import { IRoom } from "../types";

export class RoomService {
  private roomRepository: RoomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async createRoom(roomData: Partial<IRoom>): Promise<IRoom> {
    return await this.roomRepository.create(roomData);
  }

  async getRoomById(id: string): Promise<IRoom | null> {
    return await this.roomRepository.findById(id);
  }

  async getAllRooms(page: number = 1, limit: number = 10): Promise<IRoom[]> {
    return await this.roomRepository.findAll(page, limit);
  }

  async getRoomsByCreator(creatorId: string): Promise<IRoom[]> {
    return await this.roomRepository.findByCreator(creatorId);
  }

  async updateRoom(
    id: string,
    updateData: Partial<IRoom>
  ): Promise<IRoom | null> {
    return await this.roomRepository.updateById(id, updateData);
  }

  async deleteRoom(id: string): Promise<IRoom | null> {
    return await this.roomRepository.deleteById(id);
  }

  async joinRoom(roomId: string, userId: string): Promise<IRoom | null> {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    if (room.participants.length >= room.maxParticipants) {
      throw new Error("Room is full");
    }

    return await this.roomRepository.addParticipant(roomId, userId);
  }

  async leaveRoom(roomId: string, userId: string): Promise<IRoom | null> {
    return await this.roomRepository.removeParticipant(roomId, userId);
  }
}
