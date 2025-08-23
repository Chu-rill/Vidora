import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './call.controller';
import { CallService } from './call.service';

describe('CallController', () => {
  let controller: CallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallController],
      providers: [CallService],
    }).compile();

    controller = module.get<CallController>(CallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
