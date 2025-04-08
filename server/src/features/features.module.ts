import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { ImageModule } from './image/image.module';

@Module({
    imports: [BookModule, ImageModule],
})
export class FeaturesModule {}
