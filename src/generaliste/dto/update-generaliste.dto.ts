import { PartialType } from '@nestjs/swagger';
import { CreateGeneralisteDto } from './create-generaliste.dto';

export class UpdateGeneralisteDto extends PartialType(CreateGeneralisteDto) {}
