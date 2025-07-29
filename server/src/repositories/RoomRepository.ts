import { Room } from "../models/Room";
import { IRoom } from "../types";

export class RoomRepository {
  async create(roomData: Partial<IRoom>): Promise<IRoom> {
    const room = new Room(roomData);
    return await room.save();
  }

  async findById(id: string): Promise<IRoom | null> {
    return await Room.findById(id).populate("creator", "username email");
  }

  async findAll(page: number = 1, limit: number = 10): Promise<IRoom[]> {
    const skip = (page - 1) * limit;
    return await Room.find({ isActive: true })
      .populate("creator", "username email")
      .skip(skip)
      .limit(limit);
  }

  async findByCreator(creatorId: string): Promise<IRoom[]> {
    return await Room.find({ creator: creatorId, isActive: true });
  }

  async updateById(
    id: string,
    updateData: Partial<IRoom>
  ): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }

  async addParticipant(roomId: string, userId: string): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(
      roomId,
      { $addToSet: { participants: userId } },
      { new: true }
    );
  }

  async removeParticipant(
    roomId: string,
    userId: string
  ): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(
      roomId,
      { $pull: { participants: userId } },
      { new: true }
    );
  }
}
