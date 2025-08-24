import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomGateway.name);
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);

    this.server
      .to('user-joined')
      // .to(client.id)
      .emit('connection', 'Successfully connected to the server');
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server
      .to('user-left')
      .emit('disconnection', 'A user has disconnected');
  }
}
