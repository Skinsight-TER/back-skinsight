import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DermatologistService } from './dermatologist.service';
import { CreateDermatologistDto } from './dto/create-dermatologist.dto';
import { UpdateDermatologistDto } from './dto/update-dermatologist.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('dermatologist')
@ApiTags('dermatologist')
export class DermatologistController {
  constructor(private readonly dermatologistService: DermatologistService) {}

  @Post()
  create(@Body() createDermatologistDto: CreateDermatologistDto) {
    return this.dermatologistService.create(createDermatologistDto);
  }

  @Get()
  findAll() {
    return this.dermatologistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dermatologistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDermatologistDto: UpdateDermatologistDto) {
    return this.dermatologistService.update(+id, updateDermatologistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dermatologistService.remove(+id);
  }
}
