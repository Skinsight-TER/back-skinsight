import { Test, TestingModule } from '@nestjs/testing';
import { GeneralisteController } from './generaliste.controller';
import { GeneralisteService } from './generaliste.service';

describe('GeneralisteController', () => {
  let controller: GeneralisteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralisteController],
      providers: [GeneralisteService],
    }).compile();

    controller = module.get<GeneralisteController>(GeneralisteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
