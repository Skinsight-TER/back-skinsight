import { Appointment, Recommendation } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";

export class Dermatologist {

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
  userId: string;

  /*
  @ApiProperty()
  @Type(() => Appointment)
  Appointment: Appointment[];

  @ApiProperty()
  @Type(() => Recommendation)
  Recommendation: Recommendation[];

  */
  @ApiProperty()
  @IsString()
  Conversation: string[];
}
