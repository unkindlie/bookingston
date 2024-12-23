import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookController } from './book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    controllers: [BookController],
    providers: [BookService, BookRepository],
    exports: [],
})
export class BookModule {}
