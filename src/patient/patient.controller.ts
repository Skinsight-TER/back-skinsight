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
import { ApiTags } from '@nestjs/swagger';

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.patientService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  @Get(':id/images')
  getImages(@Param('id') id: string) {
    return this.patientService.getImages(id);
  }

  @Post(':id/images')
  uploadImage(@Param('id') id: string, @Body() image: any) {
    return this.patientService.uploadImage(id, image);
  }
}
