import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookImageEntity } from './book-image.entity';
import { BookImageService } from './book-image.service';
import { BookImageRepository } from './book-image.repository';
import { ImageModule } from '../image/image.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookImageEntity]), ImageModule],
    providers: [BookImageService, BookImageRepository],
    exports: [BookImageService],
})
export class BookImageModule {}
