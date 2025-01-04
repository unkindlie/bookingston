import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';
import { MessageInterceptor } from '../../common/util/interceptors/message.interceptor';
import { BookService } from './book.service';
import { BookUploadDto } from './dto/book-upload.dto';
import { BookEntity } from './book.entity';
import { BookShortDto } from './dto/book-short.dto';
import { BookDetailedDto } from './dto/book-detailed.dto';
import * as BookConstants from './constants/book.constants';
import { BookSearchDto } from './dto/book-search.dto';
import { PaginatedDataDto } from '../../common/util/dto/paginated-data.dto';

// TODO: create an interceptor that takes parameters to create a directory-like key for Redis Insight
@Controller('books')
export class BookController {
    constructor(private service: BookService) {}

    @ExposingSerialization(PaginatedDataDto(BookShortDto))
    @Get()
    async getBooks(
        @Query(new ValidationPipe({ skipMissingProperties: false }))
        search: BookSearchDto,
    ) {
        const data = await this.service.getBooks(search);
        return { data, ...search };
    }

    @ExposingSerialization(BookDetailedDto)
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(50)
    @Get(':id')
    async getBookById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BookEntity> {
        return this.service.getBookById(id);
    }

    @Post('add')
    @UseInterceptors(FilesInterceptor('images'))
    @MessageInterceptor(BookConstants.BOOK_ADD_MESSAGE)
    async addBook(
        @Body(new ValidationPipe({ transform: true })) body: BookUploadDto,
        @UploadedFiles() files: Express.Multer.File[],
    ): Promise<void> {
        return await this.service.addBook(body, files);
    }

    @Put('edit')
    @MessageInterceptor(BookConstants.BOOK_EDIT_MESSAGE)
    async editBookInfo(@Body() body: BookUploadDto): Promise<void> {
        await this.service.editBookInfo(body);
    }

    @Delete()
    @MessageInterceptor(BookConstants.BOOK_REMOVE_MESSAGE)
    async removeBook(@Body('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.service.removeBook(id);
    }
}
