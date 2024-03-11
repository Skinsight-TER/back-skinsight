import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    this.authService = authService;
  }

  async validate(email: string, password: string) {
    // console.log(email, password);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log("toto");
      throw new Error();
    }
    console.log("feur")
    return user;
  }
}

//https://docs.nestjs.com/recipes/passport
