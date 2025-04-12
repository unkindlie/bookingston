import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RefreshCookieExtractor } from '../extractors/refresh-token.extractor';
import { UserPayloadDto } from '../../features/user/dto/user-payload.dto';
import { AuthService } from '../../features/auth/auth.service';
import { Injectable } from '@nestjs/common';

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
        });
    }

    async validate(payload: { sub: UserPayloadDto }) {
        return await this.authService.refresh(payload.sub.id);
    }
}
