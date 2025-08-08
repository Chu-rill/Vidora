import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, GetRoomsQueryDto } from './dto/room.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() req) {
    const room = await this.roomService.createRoom(createRoomDto, req.user.id);
    return {
      success: true,
      message: 'Room created successfully',
      data: room,
    };
  }

  @Get()
  async getAllRooms(@Query() query: GetRoomsQueryDto) {
    const result = await this.roomService.getAllRooms(query.page, query.limit);
    return {
      success: true,
      message: 'Rooms retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    const room = await this.roomService.getRoomById(id);
    return {
      success: true,
      message: 'Room retrieved successfully',
      data: room,
    };
  }

  @Put(':id/join')
  async joinRoom(@Param('id') id: string, @Request() req) {
    const room = await this.roomService.joinRoom(id, req.user.id);
    return {
      success: true,
      message: 'Joined room successfully',
      data: room,
    };
  }

  @Put(':id/leave')
  async leaveRoom(@Param('id') id: string, @Request() req) {
    const room = await this.roomService.leaveRoom(id, req.user.id);
    return {
      success: true,
      message: 'Left room successfully',
      data: room,
    };
  }
}
