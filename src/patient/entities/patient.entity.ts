import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Preconsultation } from '../../preconsultation/entities/preconsultation.entity';
import { Image } from "@prisma/client";

export class Patient {

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
  @Type(() => Preconsultation)
  Preconsultation: Preconsultation[];
  /*
  @ApiProperty()
  @Type(() => Appointment)
  Appointment: Appointment[];
  */
  @ApiProperty()
  @Type(() => Image)
  Image: Image[];
}
