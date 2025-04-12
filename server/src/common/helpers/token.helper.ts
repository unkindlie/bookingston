import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserPayloadDto } from '../../features/user/dto/user-payload.dto';

@Injectable()
export class TokenHelper {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    async generateAccessToken(payload: UserPayloadDto): Promise<string> {
        return await this.jwtService.signAsync(
            { sub: payload },
            {
                secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
            },
        );
    }
    async generateRefreshToken(payload: UserPayloadDto): Promise<string> {
        return await this.jwtService.signAsync(
            { sub: payload },
            {
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
            },
        );
    }
}
