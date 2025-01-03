import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
    imports: [DatabaseModule, ConfigModule, SupabaseModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class CommonModule {}
