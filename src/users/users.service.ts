import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async findOne(email: string): Promise<User | undefined | void | any> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async register(user: User) {
    //enregistre le mot de passe chiffrer avec bcrypt dans la base de donnée

    const salt = 10;
    const passwordHash = await bcrypt.hash(user.password, salt);

    const patient = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        age: user.age,
        password: passwordHash,
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
