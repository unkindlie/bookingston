import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get<T>(key: string): Promise<T | null> {
        return (await this.cacheManager.get<T>(key)) ?? null;
    }
    async set(key: string, value: unknown, ttl: number = 5): Promise<void> {
        await this.cacheManager.set(key, value, { ttl });
    }
}
