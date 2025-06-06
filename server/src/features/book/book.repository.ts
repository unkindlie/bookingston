import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { BookEntity } from './book.entity';
import { BookAddDto } from './dto/book-upload.dto';
import { BOOK_NOT_FOUND } from './constants/book.constants';
import { BookSearchDto } from './dto/book-search.dto';

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(BookEntity) private repo: Repository<BookEntity>,
    ) {}

    async getBooks(options: BookSearchDto): Promise<BookEntity[]> {
        return await this.repo.find({
            skip: options.take * (options.page - 1),
            take: options.take,
        });
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
    async createEntity(input: BookAddDto, id: string): Promise<void> {
        const entity = this.repo.create({ ...input, id });

        await this.repo.insert(entity);
    }
    async update(id: string, input: BookAddDto): Promise<void> {
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
