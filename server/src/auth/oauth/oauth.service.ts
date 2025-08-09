import { Injectable } from '@nestjs/common';
import { CreateOauthDto } from './dto/create-oauth.dto';
import { UpdateOauthDto } from './dto/update-oauth.dto';

@Injectable()
export class OauthService {
  create(createOauthDto: CreateOauthDto) {
    return 'This action adds a new oauth';
  }

  findAll() {
    return `This action returns all oauth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oauth`;
  }

  update(id: number, updateOauthDto: UpdateOauthDto) {
    return `This action updates a #${id} oauth`;
  }

  remove(id: number) {
    return `This action removes a #${id} oauth`;
  }
}
