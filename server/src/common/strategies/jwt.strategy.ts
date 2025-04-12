import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayloadDto } from '../../features/user/dto/user-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // TODO: include the injection of separate config
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
        });
    }

    validate(payload: { sub: UserPayloadDto }) {
        return { user: payload.sub };
    }
}
