import { Module } from '@nestjs/common';
import { PreconsultationService } from './preconsultation.service';
import { PreconsultationController } from './preconsultation.controller';
import { GeneralisteModule } from 'src/generaliste/generaliste.module';
import { IaModule } from 'src/ia/ia.module';

@Module({
  imports: [GeneralisteModule, IaModule],
  controllers: [PreconsultationController],
  providers: [PreconsultationService],
})
export class PreconsultationModule {}
