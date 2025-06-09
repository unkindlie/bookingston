import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './supabase/supabase.module';
import { CacheModule } from './cache/cache.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule,
        SupabaseModule,
        CacheModule.register(),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class CommonModule {}
