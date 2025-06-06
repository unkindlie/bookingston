import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshTokenEntity])],
    providers: [RefreshTokenService, RefreshTokenRepository],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
