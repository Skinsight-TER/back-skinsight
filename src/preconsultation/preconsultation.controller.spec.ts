import { Test, TestingModule } from '@nestjs/testing';
import { PreconsultationController } from './preconsultation.controller';
import { PreconsultationService } from './preconsultation.service';

describe('PreconsultationController', () => {
  let controller: PreconsultationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreconsultationController],
      providers: [PreconsultationService],
    }).compile();

    controller = module.get<PreconsultationController>(PreconsultationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
