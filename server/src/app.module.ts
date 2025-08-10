import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailAndPasswordAuthModule } from './auth/email-password-auth/email-password-auth.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { GatewayModule } from './gateway/gateway.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    PrismaModule,
    EmailAndPasswordAuthModule,
    UserModule,
    RoomModule,
    GatewayModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
