import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PreconsultationService } from './preconsultation.service';
import { PreconsultationDto } from './dto/preconsultation.dto';
import { ApiTags } from '@nestjs/swagger';
import { Csrf } from 'ncsrf/dist';

@Controller('preconsultation')
@ApiTags('preconsultation')
export class PreconsultationController {
  constructor(
    private readonly preconsultationService: PreconsultationService,
  ) {}

  @Post()
  @Csrf()
  create(@Body() preconsultationDto: PreconsultationDto, patientId: string) {
    return this.preconsultationService.create(preconsultationDto, patientId);
  }

  @Get('/patient/:id')
  @Csrf()
  findAllByUser(@Param('id') id: string) {
    return this.preconsultationService.findAllByUser(id);
  }

  @Get('/generaliste/:id')
  @Csrf()
  findAllByGeneraliste(@Param('id') id: string) {
    return this.preconsultationService.findAllByGeneraliste(id);
  }

  @Put('/:id/finish')
  @Csrf()
  finishPreconsultation(@Param('id') id: string, @Body() nextStep: string) {
    return this.preconsultationService.finishPreconsultation(id, nextStep);
  }

  @Get(':id')
  @Csrf()
  findOne(@Param('id') id: string) {
    return this.preconsultationService.findOne(String(id));
  }

  @Delete(':id')
  @Csrf()
  remove(@Param('id') id: string) {
    return this.preconsultationService.remove(+id);
  }
}
