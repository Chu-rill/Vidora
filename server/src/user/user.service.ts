import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './validation';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    try {
      const user = await this.userRepository.updateUser(id, updateData);

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const { users, total } = await this.userRepository.getAllUsers(page, limit);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateOnlineStatus(id: string, isOnline: boolean) {
    return this.userRepository.updateUser(id, { isOnline });
  }
}
