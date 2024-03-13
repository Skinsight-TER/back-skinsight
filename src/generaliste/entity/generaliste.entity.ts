import { ApiProperty } from '@nestjs/swagger';
import { Preconsultation } from '../../preconsultation/entities/preconsultation.entity';
import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Conversation } from '../../conversation/entities/conversation.entity';

export class Generaliste {
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

  @ApiProperty()
  @Type(() => Preconsultation)
  Preconsultation: Preconsultation[];

  @ApiProperty()
  @Type(() => Conversation)
  Conversation: Conversation[];
}
