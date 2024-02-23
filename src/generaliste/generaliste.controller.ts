import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { GeneralisteService } from './generaliste.service';
import { CreateGeneralisteDto } from './dto/create-generaliste.dto';
import { UpdateGeneralisteDto } from './dto/update-generaliste.dto';
import { Csrf } from 'ncsrf/dist';
import { ApiTags } from "@nestjs/swagger";

@Controller('generaliste')
@ApiTags('generaliste')
export class GeneralisteController {
  constructor(private readonly generalisteService: GeneralisteService) {}

  @Post()
  @Csrf()
  create(@Body() createGeneralisteDto: CreateGeneralisteDto) {
    return this.generalisteService.create(createGeneralisteDto);
  }

  @Get()
  @Csrf()
  findAll() {
    return this.generalisteService.findAll();
  }

  @Get(':id')
  @Csrf()
  findOne(@Param('id') id: string) {
    return this.generalisteService.findOne(+id);
  }

  @Patch(':id')
  @Csrf()
  update(
    @Param('id') id: string,
    @Body() updateGeneralisteDto: UpdateGeneralisteDto,
  ) {
    return this.generalisteService.update(+id, updateGeneralisteDto);
  }

  @Delete(':id')
  @Csrf()
  remove(@Param('id') id: string) {
    return this.generalisteService.remove(+id);
  }
}
