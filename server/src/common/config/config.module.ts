import { Module } from '@nestjs/common';
import { ConfigModule as AppConfigModule } from '@nestjs/config';

import databaseConfig from './database.config';

@Module({
    imports: [
        AppConfigModule.forRoot({
            cache: true,
            load: [databaseConfig],
            envFilePath: [
                process.env.NODE_ENV != 'production' && '.env.development',
                '.env.production',
            ],
        }),
    ],
})
export class ConfigModule {}
