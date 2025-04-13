import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { AccessTokenStrategy } from '../../common/strategies/access-token.strategy';
import { CookieHelper } from '../../common/helpers/cookie.helper';
import { TokenHelper } from '../../common/helpers/token.helper';
import { RefreshTokenStragegy } from '../../common/strategies/refresh-token.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
    imports: [UserModule, RefreshTokenModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        AccessTokenStrategy,
        RefreshTokenStragegy,
        CookieHelper,
        TokenHelper,
    ],
})
export class AuthModule {}
