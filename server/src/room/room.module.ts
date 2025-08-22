import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomRepository } from './room.repository';
import { RoomAdminController } from './room.admin.controller';

@Module({
  imports: [PrismaModule],
  providers: [RoomService, RoomRepository],
  controllers: [RoomController, RoomAdminController],
  exports: [RoomService],
})
export class RoomModule {}
