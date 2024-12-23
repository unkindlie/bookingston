import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
    constructor(private repo: BookRepository) {}

    async getBooks() {
        return await this.repo.getBooks();
    }
}
