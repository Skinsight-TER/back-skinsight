import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class Preconsultation {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  patientId: string;

  @ApiProperty()
  @IsString()
  generalisteId: string;

  @ApiProperty()
  @IsString()
  infoPatient: string;
}
