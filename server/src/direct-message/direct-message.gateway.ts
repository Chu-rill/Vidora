import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DirectMessageService } from './direct-message.service';

@WebSocketGateway({ cors: true })
export class DirectMessageGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly service: DirectMessageService) {}

  @SubscribeMessage('dm:send')
  async handleSendDM(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      content: string;
    },
    // message:MessageDto
  ) {
    const msg = await this.service.sendDirectMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );

    // Notify both sender and receiver
    this.server.to(data.senderId).emit('dm:new', msg);
    this.server.to(data.receiverId).emit('dm:new', msg);
  }
}
