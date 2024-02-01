import { PartialType } from '@nestjs/mapped-types';
import { CreatePreconsultationDto } from './create-preconsultation.dto';

export class UpdatePreconsultationDto extends PartialType(CreatePreconsultationDto) {}
