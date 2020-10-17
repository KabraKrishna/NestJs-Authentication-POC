import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

const JwtConstant = {
    secret : 'my#secret@Key'
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtGuard') {

    logger = new Logger();

    constructor(private authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConstant.secret,
        });
        
    }

    async validate(payload: any) {

        console.log("payload: ",payload)
        console.log("Now: ",Date.now())

        return payload.userId ? payload.userId : false;
    }
}