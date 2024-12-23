import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from './book.entity';

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(BookEntity) private repo: Repository<BookEntity>,
    ) {}

    async getBooks(): Promise<BookEntity[]> {
        return await this.repo.find();
    }
}
