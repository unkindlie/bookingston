import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookController } from './book.controller';
import { BookImageModule } from '../book-image/book-image.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookEntity]),
        BookImageModule,
        CacheModule.register(),
    ],
    controllers: [BookController],
    providers: [BookService, BookRepository],
    exports: [],
})
export class BookModule {}
