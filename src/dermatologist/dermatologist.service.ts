import { Injectable } from '@nestjs/common';
import { CreateDermatologistDto } from './dto/create-dermatologist.dto';
import { UpdateDermatologistDto } from './dto/update-dermatologist.dto';
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DermatologistService {
  prisma = new PrismaClient();

  create(createDermatologistDto: CreateDermatologistDto) {
    return 'This action adds a new dermatologist';
  }

  findAll() {
    return this.prisma.dermatologist.findMany({
      include: {
        Appointment: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} dermatologist`;
  }

  update(id: number, updateDermatologistDto: UpdateDermatologistDto) {

    return `This action updates a #${id} dermatologist`;
  }

  remove(id: number) {
    return `This action removes a #${id} dermatologist`;
  }
}
