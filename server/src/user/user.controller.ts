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
import { JwtAuthGuard } from '../guards/auth.guard';
import { GetUsersQueryDto, UpdateUserDto } from './validation';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.getUserById(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.user.id, updateUserDto);
  }

  @Get()
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.userService.getAllUsers(query.page, query.limit);
  }
}
