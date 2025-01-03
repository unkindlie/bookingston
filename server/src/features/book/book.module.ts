import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookController } from './book.controller';
import { SupabaseModule } from '../../common/supabase/supabase.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity]), SupabaseModule],
    controllers: [BookController],
    providers: [BookService, BookRepository],
    exports: [],
})
export class BookModule {}
