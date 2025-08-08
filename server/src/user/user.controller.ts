import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, GetUsersQueryDto } from './dto/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUserById(req.user.id);
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    };
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(req.user.id, updateUserDto);
    return {
      success: true,
      message: 'Profile updated successfully',
      data: user,
    };
  }

  @Get()
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    const result = await this.userService.getAllUsers(query.page, query.limit);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    };
  }
}
