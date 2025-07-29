import { User } from "../models/User";
import { IUser } from "../types";

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async updateById(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<IUser[]> {
    const skip = (page - 1) * limit;
    return await User.find({}).skip(skip).limit(limit);
  }

  async updateOnlineStatus(
    id: string,
    isOnline: boolean
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      { isOnline, lastSeen: new Date() },
      { new: true }
    );
  }
}
