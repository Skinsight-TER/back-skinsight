import { Module } from '@nestjs/common';
import { PreconsultationService } from './preconsultation.service';
import { PreconsultationController } from './preconsultation.controller';
import { GeneralisteModule } from 'src/generaliste/generaliste.module';

@Module({
  imports: [GeneralisteModule],
  controllers: [PreconsultationController],
  providers: [PreconsultationService],
})
export class PreconsultationModule {}
