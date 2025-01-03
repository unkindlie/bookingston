import { Injectable } from '@nestjs/common';

import { BookRepository } from './book.repository';
import { BookUploadDto } from './dto/book-upload.dto';
import { BookEntity } from './book.entity';
import { BookSearchDto } from './dto/book-search.dto';
import { SupabaseStorageService } from '../../common/supabase/supabase-storage.service';

@Injectable()
export class BookService {
    constructor(
        private repo: BookRepository,
        private storageService: SupabaseStorageService,
    ) {}

    async getBooks(options: BookSearchDto): Promise<BookEntity[]> {
        return await this.repo.getBooks(options);
    }
    async getBookById(id: string): Promise<BookEntity> {
        return await this.repo.getBookByCondition({ id });
    }
    async addBook(input: BookUploadDto): Promise<void> {
        await this.repo.create(input);
    }
    async editBookInfo(input: BookUploadDto): Promise<void> {
        const { id, ...rest } = input;

        await this.repo.update(id, rest);
    }
    async removeBook(bookId: string): Promise<void> {
        await this.repo.delete(bookId);
    }
    async uploadFile(file: Express.Multer.File): Promise<string | null> {
        const { data } = await this.storageService.uploadFileToBucket(
            file,
            'images',
        );

        if (data) {
            return this.storageService.getFileUrl(data.path, 'images');
        }

        return null;
    }
}
