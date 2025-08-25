import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomMessageService } from './room-message.service';

@WebSocketGateway(5002, { cors: { origin: '*' } })
export class RoomMessageGateway {
  // private readonly logger = new Logger(RoomMessageGateway.name);
  @WebSocketServer() server: Server;

  constructor(private messageService: RoomMessageService) {}

  // @SubscribeMessage('message:send')
  // async handleSendMessage(
  //   @MessageBody() data: { roomId: string; userId: string; content: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const message = await this.messageService.sendMessage(
  //     data.roomId,
  //     data.userId,
  //     data.content,
  //   );
  //   // Broadcast to all room participants
  //   this.server.to(data.roomId).emit('message:new', message);
  // }

  @SubscribeMessage('message:send')
  async handleSendMessage(@MessageBody() message: any) {
    console.log('Message received in gateway:', message);
  }
}
