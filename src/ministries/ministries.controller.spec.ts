import { Test, type TestingModule } from '@nestjs/testing';

import { MinistriesController } from './ministries.controller';
import { MinistriesService } from './ministries.service';

describe('MinistriesController', () => {
  let controller: MinistriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinistriesController],
      providers: [MinistriesService],
    }).compile();

    controller = module.get<MinistriesController>(MinistriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
