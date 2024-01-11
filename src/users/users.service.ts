import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {

  prisma = new PrismaClient()

  async findOne(email: string): Promise<User | undefined | void | any> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async register(user: User) {
    console.log('user ---------------', user);
    const patient = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        age: user.age,
        password: user.password,
      },
    });
    return await this.prisma.patient.create({
      data: {
        user: {
          connect: {
            id: patient.id,
          },
        },
      },
    });
  }
}
