import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { Controller, Post } from '@nestjs/common';
import { Csrf } from 'ncsrf/dist';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Csrf()
  @ApiOkResponse({ type: AuthEntity })
  login(user: any) {
    return this.authService.login(user);
  }

}
