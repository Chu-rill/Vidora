import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    try {
      const user = await this.userRepository.updateUser(id, updateData);

      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: user,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    // Ensure safe defaults
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;

    const { users, total } = await this.userRepository.getAllUsers(
      pageNum,
      limitNum,
    );

    const totalPages = Math.ceil(total / limit);

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  }

  async updateOnlineStatus(id: string, isOnline: boolean) {
    return this.userRepository.updateUser(id, { isOnline });
  }
}
