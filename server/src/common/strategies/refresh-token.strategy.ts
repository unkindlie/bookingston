import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { RefreshCookieExtractor } from '../extractors/refresh-token.extractor';
import { UserPayloadDto } from '../../features/user/dto/user-payload.dto';
import { AuthService } from '../../features/auth/auth.service';

@Injectable()
export class RefreshTokenStragegy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([RefreshCookieExtractor]),
            secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: { sub: UserPayloadDto }) {
        const { refreshToken } = req.cookies;

        return await this.authService.refresh(refreshToken, payload.sub.id);
    }
}
