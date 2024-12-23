import { Module } from '@nestjs/common';
import { ConfigModule as AppConfigModule } from '@nestjs/config';

import databaseConfig from './database.config';

@Module({
    imports: [
        AppConfigModule.forRoot({
            cache: true,
            load: [databaseConfig],
            envFilePath: ['.env.local'],
        }),
    ],
})
export class ConfigModule {}
