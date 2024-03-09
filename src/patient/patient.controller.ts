import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Csrf } from "ncsrf/dist";
import { ApiTags } from "@nestjs/swagger";

@Controller('patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Csrf()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
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
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @Csrf()
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
