import { Module } from '@nestjs/common';
import { RoomMessageService } from './room-message.service';
import { RoomMessageGateway } from './room-message.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomMessageRepository } from './room-message.repository';

@Module({
  providers: [RoomMessageGateway, RoomMessageService, RoomMessageRepository],
  imports: [PrismaModule],
})
export class RoomMessageModule {}
