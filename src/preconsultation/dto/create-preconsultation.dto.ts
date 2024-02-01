import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreatePreconsultationDto {
  @ApiProperty()
  status: Status;

  @ApiProperty()
  description: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  generalisteId: string;

  @ApiProperty()
  infoPatient: string;
}
