import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomRepository } from './room.repository';

@Module({
  imports: [PrismaModule],
  providers: [RoomService, RoomRepository],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
