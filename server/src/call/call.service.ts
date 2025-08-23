import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

@Injectable()
export class CallService {
  create(createCallDto: CreateCallDto) {
    return 'This action adds a new call';
  }

  findAll() {
    return `This action returns all call`;
  }

  findOne(id: number) {
    return `This action returns a #${id} call`;
  }

  update(id: number, updateCallDto: UpdateCallDto) {
    return `This action updates a #${id} call`;
  }

  remove(id: number) {
    return `This action removes a #${id} call`;
  }
}
