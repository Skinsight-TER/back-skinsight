import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class PreconsultationDto {
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

  @ApiProperty()
  image: any;
}
