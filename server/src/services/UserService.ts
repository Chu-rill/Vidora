import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../types";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await this.userRepository.updateById(id, updateData);
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
    return await this.userRepository.findAll(page, limit);
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await this.userRepository.deleteById(id);
  }

  async updateOnlineStatus(
    id: string,
    isOnline: boolean
  ): Promise<IUser | null> {
    return await this.userRepository.updateOnlineStatus(id, isOnline);
  }
}
