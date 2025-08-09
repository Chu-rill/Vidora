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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetRoomsQueryDto, Room } from './validation';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  async createRoom(@Body() createRoomDto: Room, @Request() req) {
    return this.roomService.createRoom(createRoomDto, req.user.id);
  }

  @Get()
  async getAllRooms(@Query() query: GetRoomsQueryDto) {
    return this.roomService.getAllRooms(query.page, query.limit);
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return this.roomService.getRoomById(id);
  }

  @Put(':id/join')
  async joinRoom(@Param('id') id: string, @Request() req) {
    return this.roomService.joinRoom(id, req.user.id);
  }

  @Put(':id/leave')
  async leaveRoom(@Param('id') id: string, @Request() req) {
    return this.roomService.leaveRoom(id, req.user.id);
  }
}
