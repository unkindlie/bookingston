import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
        }),
        ConfigModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class CommonModule {}
