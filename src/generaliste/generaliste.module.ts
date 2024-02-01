import { Module } from '@nestjs/common';
import { GeneralisteService } from './generaliste.service';
import { GeneralisteController } from './generaliste.controller';

@Module({
  controllers: [GeneralisteController],
  providers: [GeneralisteService],
  exports: [GeneralisteService],
})
export class GeneralisteModule {}
