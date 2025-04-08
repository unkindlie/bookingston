import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    CacheModule as AppCacheModule,
    CacheStore,
} from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

import { CacheService } from './cache.service';

export class CacheModule {
    static register(): DynamicModule {
        return {
            module: CacheModule,
            imports: [
                AppCacheModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => {
                        const store = await redisStore({
                            store: 'none',
                            socket: {
                                host: configService.get('cache.host'),
                                port: configService.get('cache.port'),
                            },
                        });

                        return {
                            store: store as unknown as CacheStore,
                        };
                    },
                    inject: [ConfigService],
                    isGlobal: true,
                }),
            ],
            providers: [CacheService],
            exports: [CacheService],
            global: true,
        };
    }
}
