import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { RefreshCookieExtractor } from '../extractors/refresh-token.extractor';
import { UserPayloadDto } from '../../user/dto/user-payload.dto';
import { AuthService } from '../auth.service';
import { JWT_REFRESH_KEY } from '../constants/auth.constants';
import refreshTokenConfig from '../config/refresh-token.config';

@Injectable()
export class RefreshTokenStragegy extends PassportStrategy(
    Strategy,
    JWT_REFRESH_KEY,
) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
        @Inject(refreshTokenConfig.KEY)
        private config: ConfigType<typeof refreshTokenConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshCookieExtractor]),
            secretOrKey: config.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: { sub: UserPayloadDto }) {
        const { refreshToken } = req.cookies;

        return await this.authService.refresh(refreshToken, payload.sub.id);
    }
}
