import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DirectMessageService } from './direct-message.service';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
import { UpdateDirectMessageDto } from './dto/update-direct-message.dto';

@WebSocketGateway()
export class DirectMessageGateway {
  constructor(private readonly directMessageService: DirectMessageService) {}

  @SubscribeMessage('createDirectMessage')
  create(@MessageBody() createDirectMessageDto: CreateDirectMessageDto) {
    return this.directMessageService.create(createDirectMessageDto);
  }

  @SubscribeMessage('findAllDirectMessage')
  findAll() {
    return this.directMessageService.findAll();
  }

  @SubscribeMessage('findOneDirectMessage')
  findOne(@MessageBody() id: number) {
    return this.directMessageService.findOne(id);
  }

  @SubscribeMessage('updateDirectMessage')
  update(@MessageBody() updateDirectMessageDto: UpdateDirectMessageDto) {
    return this.directMessageService.update(updateDirectMessageDto.id, updateDirectMessageDto);
  }

  @SubscribeMessage('removeDirectMessage')
  remove(@MessageBody() id: number) {
    return this.directMessageService.remove(id);
  }
}
