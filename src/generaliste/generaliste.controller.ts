import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeneralisteService } from './generaliste.service';
import { CreateGeneralisteDto } from './dto/create-generaliste.dto';
import { UpdateGeneralisteDto } from './dto/update-generaliste.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Generaliste } from "./entity/generaliste.entity";

@Controller('generaliste')
@ApiTags('generalist')
export class GeneralisteController {
  constructor(private readonly generalisteService: GeneralisteService) {}

  @ApiCreatedResponse({ type: Generaliste })
  @Post()
  create(@Body() createGeneralisteDto: CreateGeneralisteDto) {
    return this.generalisteService.create(createGeneralisteDto);
  }

  @ApiResponse({ type: Generaliste, isArray: true })
  @Get()
  findAll() {
    return this.generalisteService.findAll();
  }

  @ApiOkResponse({ type: Generaliste })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalisteService.findOne(+id);
  }
  @ApiCreatedResponse({ type: Generaliste })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralisteDto: UpdateGeneralisteDto,
  ) {
    return this.generalisteService.update(+id, updateGeneralisteDto);
  }

  @ApiOkResponse({ type: Generaliste })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalisteService.remove(+id);
  }
}
