import { User } from "../../generated/prisma";
import { UserRepository } from "./user.repository";
import { updateUserDto } from "./user.validation";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(
    id: string,
    updateData: updateUserDto
  ): Promise<User | null> {
    return await this.userRepository.updateById(id, updateData);
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<User[]> {
    return await this.userRepository.findAll(page, limit);
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.userRepository.deleteById(id);
  }

  async updateOnlineStatus(
    id: string,
    isOnline: boolean
  ): Promise<User | null> {
    return await this.userRepository.updateOnlineStatus(id, isOnline);
  }
}
