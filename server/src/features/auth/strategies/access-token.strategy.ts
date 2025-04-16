import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayloadDto } from '../../user/dto/user-payload.dto';
import { JWT_ACCESS_KEY } from '../constants/auth.constants';
import accessTokenConfig from '../config/access-token.config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
    Strategy,
    JWT_ACCESS_KEY,
) {
    constructor(
        @Inject(accessTokenConfig.KEY)
        private config: ConfigType<typeof accessTokenConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.secret,
        });
    }

    validate(payload: { sub: UserPayloadDto }) {
        return payload.sub;
    }
}
