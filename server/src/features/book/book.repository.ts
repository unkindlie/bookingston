import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { BookEntity } from './book.entity';
import { BookUploadDto } from './dto/book-upload.dto';
import { BOOK_NOT_FOUND } from './constants/book.constants';

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(BookEntity) private repo: Repository<BookEntity>,
    ) {}

    async getBooks(): Promise<BookEntity[]> {
        return await this.repo.find();
    }
    async getBookByCondition(
        condition: FindOptionsWhere<BookEntity>,
    ): Promise<BookEntity> {
        const book = await this.repo.findOne({
            where: condition,
        });
        if (!book) {
            throw new NotFoundException(BOOK_NOT_FOUND);
        }

        return book;
    }
    async create(input: BookUploadDto): Promise<void> {
        const entity = this.repo.create(input);

        await this.repo.insert(entity);
    }
    async update(id: string, input: BookUploadDto): Promise<void> {
        const exists = await this.repo.existsBy({ id });
        if (!exists) {
            throw new NotFoundException(BOOK_NOT_FOUND);
        }

        await this.repo.update(id, input);
    }
    async delete(id: string): Promise<void> {
        const exists = await this.repo.existsBy({ id });
        if (!exists) {
            throw new NotFoundException(BOOK_NOT_FOUND);
        }

        await this.repo.delete({ id });
    }
}
