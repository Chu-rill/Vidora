import { Module } from '@nestjs/common';
import { DirectMessageService } from './direct-message.service';
import { DirectMessageGateway } from './direct-message.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DirectMessageRepository } from './direct-message-repository';

@Module({
  providers: [
    DirectMessageGateway,
    DirectMessageService,
    DirectMessageRepository,
  ],
  imports: [PrismaModule],
})
export class DirectMessageModule {}
