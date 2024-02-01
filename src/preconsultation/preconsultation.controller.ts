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
  create(@Body() createPreconsultationDto: CreatePreconsultationDto) {
    return this.preconsultationService.create(createPreconsultationDto);
  }

  @Get('/patient/:id')
  findAllByUser(@Param('id') id: string) {
    return this.preconsultationService.findAllByUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preconsultationService.remove(+id);
  }
}
