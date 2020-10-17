import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/DTOs/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'loginGuard') {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId',
    });
  }

  async validate(userId: string, password: string): Promise<boolean> {

    return await this.authService.validateUser(userId, password);
  }
}