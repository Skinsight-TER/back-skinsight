import { Module } from '@nestjs/common';
import { DermatologistService } from './dermatologist.service';
import { DermatologistController } from './dermatologist.controller';

@Module({
  controllers: [DermatologistController],
  providers: [DermatologistService],
})
export class DermatologistModule {}
