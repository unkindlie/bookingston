import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';

@Module({
    imports: [UserModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
