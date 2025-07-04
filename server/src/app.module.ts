import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { CommonModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';
import { AccessTokenGuard } from './features/auth/guards/access-token.guard';

@Module({
    imports: [CommonModule, FeaturesModule],
    providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
