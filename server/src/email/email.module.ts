import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [EmailService],
  exports: [EmailService],
  imports: [ConfigModule],
})
export class EmailModule {}
