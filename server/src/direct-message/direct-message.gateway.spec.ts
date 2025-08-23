import { Test, TestingModule } from '@nestjs/testing';
import { DirectMessageGateway } from './direct-message.gateway';
import { DirectMessageService } from './direct-message.service';

describe('DirectMessageGateway', () => {
  let gateway: DirectMessageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectMessageGateway, DirectMessageService],
    }).compile();

    gateway = module.get<DirectMessageGateway>(DirectMessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
