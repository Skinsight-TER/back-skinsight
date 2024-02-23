import { PartialType } from '@nestjs/mapped-types';
import { CreateDermatologistDto } from './create-dermatologist.dto';

export class UpdateDermatologistDto extends PartialType(CreateDermatologistDto) {}
