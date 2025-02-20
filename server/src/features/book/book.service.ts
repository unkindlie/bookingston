import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { BookRepository } from './book.repository';
import { BookAddDto } from './dto/book-upload.dto';
import { BookSearchDto } from './dto/book-search.dto';
import { BookImageService } from '../book-image/book-image.service';
import { BookDetailedDto } from './dto/book-detailed.dto';
import { BookShortDto } from './dto/book-short.dto';
import { BookEditDto } from './dto/book-edit.dto';

@Injectable()
export class BookService {
    constructor(
        private repo: BookRepository,
        private bookImageService: BookImageService,
    ) {}

    async getBooks(options: BookSearchDto): Promise<Array<BookShortDto>> {
        const booksData = await this.repo.getBooks(options);
        const books = await Promise.all(
            booksData.map(async (book) => {
                const imageUrl =
                    await this.bookImageService.getTitleImageForBook(book.id);
                return { ...book, imageUrl };
            }),
        );

        return books;
    }
    async getBookById(id: string): Promise<BookDetailedDto> {
        const bookData = await this.repo.getBookByCondition({ id });
        const images = await this.bookImageService.getImagesForBook(id);

        return { ...bookData, images };
    }
    async addBook(
        input: BookAddDto,
        images: Array<Express.Multer.File>,
    ): Promise<void> {
        const id = v4();
        await this.repo.createEntity(input, id);

        if (images.length !== 0) {
            for (const image of images) {
                await this.bookImageService.uploadBookImage(image, id);
            }
        }
    }
    async editBookInfo(input: BookEditDto): Promise<void> {
        const { id, ...rest } = input;

        await this.repo.update(id, rest);
    }
    async removeBook(bookId: string): Promise<void> {
        await this.repo.delete(bookId);
    }
}
