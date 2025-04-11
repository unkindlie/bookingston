import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
