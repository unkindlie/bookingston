import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                port: configService.get('database.port'),
                database: configService.get('database.name'),
                entities: [__dirname + '/../../features/**/*.entity.{ts,js}'],
                migrations: [__dirname + '/migrations/*.{js,ts}'],
                synchronize: configService.get('NODE_ENV') !== 'production',
                migrationsRun: configService.get('NODE_ENV') === 'production',
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
