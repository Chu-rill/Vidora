import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { CreateOauthDto } from './dto/create-oauth.dto';
import { UpdateOauthDto } from './dto/update-oauth.dto';

@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post()
  create(@Body() createOauthDto: CreateOauthDto) {
    return this.oauthService.create(createOauthDto);
  }

  @Get()
  findAll() {
    return this.oauthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oauthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOauthDto: UpdateOauthDto) {
    return this.oauthService.update(+id, updateOauthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oauthService.remove(+id);
  }
}
