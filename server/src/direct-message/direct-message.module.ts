import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageGateway } from './direct-message.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DirectMessageGateway, DirectMessageService],
  imports: [PrismaModule],
})
export class DirectMessageModule {}
