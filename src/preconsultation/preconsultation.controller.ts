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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Preconsultation } from './entities/preconsultation.entity';

@Controller('preconsultation')
@ApiTags('preconsultation')
export class PreconsultationController {
  constructor(
    private readonly preconsultationService: PreconsultationService,
  ) {}

  @ApiCreatedResponse({ type: PreconsultationDto })
  @Post()
  create(@Body() preconsultationDto: PreconsultationDto, patientId: string) {
    return this.preconsultationService.create(preconsultationDto, patientId);
  }

  @ApiOkResponse({ type: Preconsultation, isArray: true })
  @Get('/patient/:id')
  findAllByUser(@Param('id') id: string) {
    return this.preconsultationService.findAllByUser(id);
  }

  @ApiOkResponse({ type: Preconsultation, isArray: true })
  @Get('/generaliste/:id')
  findAllByGeneraliste(@Param('id') id: string) {
    return this.preconsultationService.findAllByGeneraliste(id);
  }

  @ApiCreatedResponse({ type: Preconsultation })
  @Put('/:id/finish')
  finishPreconsultation(@Param('id') id: string, @Body() nextStep: string) {
    return this.preconsultationService.finishPreconsultation(id, nextStep);
  }

  @ApiOkResponse({ type: Preconsultation })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preconsultationService.findOne(String(id));
  }
}
