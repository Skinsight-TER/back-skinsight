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

@Controller('preconsultation')
@ApiTags('preconsultation')
export class PreconsultationController {
  constructor(
    private readonly preconsultationService: PreconsultationService,
  ) {}

  @Post()
  create(@Body() preconsultationDto: PreconsultationDto, patientId: string) {
    return this.preconsultationService.create(preconsultationDto, patientId);
  }

  @Get('/patient/:id')
  findAllByUser(@Param('id') id: string) {
    return this.preconsultationService.findAllByUser(id);
  }

  @Get('/generaliste/:id')
  findAllByGeneraliste(@Param('id') id: string) {
    return this.preconsultationService.findAllByGeneraliste(id);
  }

  @Put('/:id/finish')
  finishPreconsultation(@Param('id') id: string, @Body() nextStep: string) {
    return this.preconsultationService.finishPreconsultation(
      id,
      nextStep,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preconsultationService.findOne(String(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preconsultationService.remove(+id);
  }
}
