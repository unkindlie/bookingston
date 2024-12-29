import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { CacheModule } from '../common/cache/cache.module';

@Module({
    imports: [BookModule, CacheModule],
})
export class FeaturesModule {}
