import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Csrf } from 'ncsrf/dist';
import { ApiTags } from '@nestjs/swagger';

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Csrf()
  create() {
    return this.patientService.create();
  }

  @Get()
  @Csrf()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @Csrf()
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  @Csrf()
  update(@Param('id') id: string) {
    return this.patientService.update(+id);
  }

  @Delete(':id')
  @Csrf()
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  @Get(':id/images')
  @Csrf()
  getImages(@Param('id') id: string) {
    return this.patientService.getImages(id);
  }

  @Post(':id/images')
  @Csrf()
  uploadImage(@Param('id') id: string, @Body() image: any) {
    return this.patientService.uploadImage(id, image);
  }
}
