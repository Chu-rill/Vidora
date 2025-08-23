import { Test, TestingModule } from '@nestjs/testing';
import { DirectMessageService } from './direct-message.service';

describe('DirectMessageService', () => {
  let service: DirectMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectMessageService],
    }).compile();

    service = module.get<DirectMessageService>(DirectMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
