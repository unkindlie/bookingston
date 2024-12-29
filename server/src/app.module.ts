import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';
import { CacheModule } from './common/cache/cache.module';

@Module({
    imports: [CommonModule, FeaturesModule, CacheModule.register()],
})
export class AppModule {}
