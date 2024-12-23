import { Controller, Get } from '@nestjs/common';

import { BookService } from './book.service';

@Controller('books')
export class BookController {
    constructor(private service: BookService) {}

    @Get()
    async getBooks() {
        return this.service.getBooks();
    }
}
