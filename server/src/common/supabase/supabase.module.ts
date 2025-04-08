import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

import { SupabaseStorageService } from './supabase-storage.service';

const SupabaseProvider = {
    provide: 'SUPABASE_CLIENT',
    useFactory: (configService: ConfigService) => {
        return createClient(
            configService.get('supabase.projectUrl'),
            configService.get('supabase.apiKey'),
        );
    },
    inject: [ConfigService],
};

@Module({
    imports: [ConfigModule],
    providers: [SupabaseProvider, SupabaseStorageService],
    exports: [SupabaseStorageService],
})
export class SupabaseModule {}
