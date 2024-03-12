import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PatientService {
  prisma = new PrismaClient();

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }

  getImages(id: string) {
    return this.prisma.patient.findUnique({
      where: {
        id: id,
      },
      include: {
        Image: true,
      },
    });
  }

  uploadImage(id: string, image: any) {
    return this.prisma.patient.update({
      where: {
        id: id,
      },
      data: {
        Image: {
          create: {
            url: image.url,
          },
        },
      },
    });
  }
}