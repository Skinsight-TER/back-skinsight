import { Injectable } from '@nestjs/common';
import { CreateGeneralisteDto } from './dto/create-generaliste.dto';
import { UpdateGeneralisteDto } from './dto/update-generaliste.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GeneralisteService {
  prisma = new PrismaClient();
  create(createGeneralisteDto: CreateGeneralisteDto) {
    return 'This action adds a new generaliste';
  }

  findAll() {
    return this.prisma.generaliste.findMany({
      include: {
        preconsultation: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} generaliste`;
  }

  update(id: number, updateGeneralisteDto: UpdateGeneralisteDto) {
    return `This action updates a #${id} generaliste`;
  }

  remove(id: number) {
    return `This action removes a #${id} generaliste`;
  }
}
