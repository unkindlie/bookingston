import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserPayloadDto } from '../../user/dto/user-payload.dto';
import accessTokenConfig from '../config/access-token.config';
import refreshTokenConfig from '../config/refresh-token.config';

@Injectable()
export class TokenHelper {
    constructor(
        private jwtService: JwtService,
        @Inject(accessTokenConfig.KEY)
        private accessConfig: ConfigType<typeof accessTokenConfig>,
        @Inject(refreshTokenConfig.KEY)
        private refreshConfig: ConfigType<typeof refreshTokenConfig>,
    ) {}

    async generateAccessToken(payload: UserPayloadDto): Promise<string> {
        return await this.jwtService.signAsync(
            { sub: payload },
            {
                secret: this.accessConfig.secret,
                expiresIn: this.accessConfig.expiresIn,
            },
        );
    }
    async generateRefreshToken(payload: UserPayloadDto): Promise<string> {
        return await this.jwtService.signAsync(
            { sub: payload },
            {
                secret: this.refreshConfig.secret,
                expiresIn: this.refreshConfig.expiresIn,
            },
        );
    }
}
