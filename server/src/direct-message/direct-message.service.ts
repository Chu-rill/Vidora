import { Injectable } from '@nestjs/common';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
import { UpdateDirectMessageDto } from './dto/update-direct-message.dto';

@Injectable()
export class DirectMessageService {
  create(createDirectMessageDto: CreateDirectMessageDto) {
    return 'This action adds a new directMessage';
  }

  findAll() {
    return `This action returns all directMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} directMessage`;
  }

  update(id: number, updateDirectMessageDto: UpdateDirectMessageDto) {
    return `This action updates a #${id} directMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} directMessage`;
  }
}
