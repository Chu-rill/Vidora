import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomRepository } from './room.repository';
import { RoomAdminController } from './room.admin.controller';
import { RoomGateway } from './room.gateway';
import { RoomMessageModule } from 'src/room-message/room-message.module';

@Module({
  imports: [PrismaModule, RoomMessageModule],
  providers: [RoomService, RoomRepository, RoomGateway],
  controllers: [RoomController, RoomAdminController],
  exports: [RoomService],
})
export class RoomModule {}
