import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreconsultationService } from './preconsultation.service';
import { CreatePreconsultationDto } from './dto/create-preconsultation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('preconsultation')
@ApiTags('preconsultation')
export class PreconsultationController {
  constructor(
    private readonly preconsultationService: PreconsultationService,
  ) {}

  @Post()
  create(@Body() createPreconsultationDto: CreatePreconsultationDto, patientId: string) {
    return this.preconsultationService.create(createPreconsultationDto, patientId);
  }

  @Get('/patient/:id')
  findAllByUser(@Param('id') id: string) {
    return this.preconsultationService.findAllByUser(id);
  }

  @Get('/generaliste/:id')
  findAllByGeneraliste(@Param('id') id: string) {
    return this.preconsultationService.findAllByGeneraliste(id);
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
