import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    return await this.usersService.register(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: JwtPayload = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });

    const userId = payload.sub;

    if (userId) {
      return this.usersService.findOne(userId);
    }
  }
}
