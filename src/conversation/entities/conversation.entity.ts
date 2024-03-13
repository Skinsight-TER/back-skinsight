import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Message } from './message.entity';

export class Conversation {
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
  generalisteId: string;

  @ApiProperty()
  @IsString()
  dermatologistId: string;

  @ApiProperty()
  @Type(() => Message)
  Message: Message[];
}
