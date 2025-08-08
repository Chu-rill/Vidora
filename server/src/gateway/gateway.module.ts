import { Module } from '@nestjs/common';
import { VideoChatGateway } from './video-chat.gateway';

@Module({
  providers: [VideoChatGateway],
})
export class GatewayModule {}
