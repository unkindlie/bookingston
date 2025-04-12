import { Module } from '@nestjs/common';
import { ConfigModule as AppConfigModule } from '@nestjs/config';

import databaseConfig from './database.config';
import cacheConfig from '../cache/cache.config';
import supabaseConfig from '../supabase/supabase.config';

@Module({
    imports: [
        AppConfigModule.forRoot({
            cache: true,
            load: [databaseConfig, cacheConfig, supabaseConfig],
            envFilePath: [
                process.env.NODE_ENV != 'production' && '.env.development',
                '.env.production',
            ],
            isGlobal: true,
        }),
    ],
})
export class ConfigModule {}
