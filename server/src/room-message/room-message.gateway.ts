import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { RoomMessageService } from './room-message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway()
export class RoomMessageGateway {
  constructor(private readonly roomMessageService: RoomMessageService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.roomMessageService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.roomMessageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.roomMessageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.roomMessageService.update(
      updateMessageDto.id,
      updateMessageDto,
    );
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.roomMessageService.remove(id);
  }
}
