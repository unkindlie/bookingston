import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CookieHelper } from '../../common/helpers/cookie.helper';
import { TokenHelper } from '../../common/helpers/token.helper';
import { RefreshTokenStragegy } from './strategies/refresh-token.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from '../../common/config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    imports: [
        UserModule,
        RefreshTokenModule,
        JwtModule.register({}),
        ConfigModule.forFeature(googleOauthConfig),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        AccessTokenStrategy,
        RefreshTokenStragegy,
        GoogleStrategy,
        CookieHelper,
        TokenHelper,
    ],
})
export class AuthModule {}
