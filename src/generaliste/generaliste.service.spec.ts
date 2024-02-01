import { Test, TestingModule } from '@nestjs/testing';
import { GeneralisteService } from './generaliste.service';

describe('GeneralisteService', () => {
  let service: GeneralisteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralisteService],
    }).compile();

    service = module.get<GeneralisteService>(GeneralisteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
