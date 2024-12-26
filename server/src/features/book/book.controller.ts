import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';

import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';
import { MessageInterceptor } from '../../common/interceptors/message.interceptor';
import { BookService } from './book.service';
import { BookUploadDto } from './dto/book-upload.dto';
import { BookEntity } from './book.entity';
import { BookShortDto } from './dto/book-short.dto';
import { BookDetailedDto } from './dto/book-detailed.dto';
import * as BookConstants from './constants/book.constants';

@Controller('books')
export class BookController {
    constructor(private service: BookService) {}

    @ExposingSerialization(BookShortDto)
    @Get()
    async getBooks(): Promise<BookEntity[]> {
        return this.service.getBooks();
    }

    @ExposingSerialization(BookDetailedDto)
    @Get(':id')
    async getBookById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BookEntity> {
        return this.service.getBookById(id);
    }

    @Post('add')
    @MessageInterceptor(BookConstants.BOOK_ADD_MESSAGE)
    async addBook(@Body() body: BookUploadDto): Promise<void> {
        await this.service.addBook(body);
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
