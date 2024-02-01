import { Test, TestingModule } from '@nestjs/testing';
import { PreconsultationService } from './preconsultation.service';

describe('PreconsultationService', () => {
  let service: PreconsultationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreconsultationService],
    }).compile();

    service = module.get<PreconsultationService>(PreconsultationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
