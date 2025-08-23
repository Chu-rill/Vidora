import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FriendshipRepository } from './friendship.repository';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository],
  imports: [PrismaModule],
})
export class FriendshipModule {}
