import { Injectable } from '@nestjs/common';

import { BookImageRepository } from './book-image.repository';
import { ImageService } from '../image/image.service';
import { BOOK_BUCKET_NAME } from '../book/constants/book.constants';
import { ImageEntity } from '../image/image.entity';

@Injectable()
export class BookImageService {
    constructor(
        private repo: BookImageRepository,
        private imageService: ImageService,
    ) {}

    async getTitleImageForBook(bookId: string): Promise<string> {
        return await this.repo.getTitleImageForBook(bookId);
    }
    async getImagesForBook(bookId: string): Promise<ImageEntity[]> {
        return await this.repo.getImagesForBook(bookId);
    }
    async uploadBookImage(
        image: Express.Multer.File,
        bookId: string,
    ): Promise<void> {
        const imageId = await this.imageService.uploadImage(image, {
            bucketName: BOOK_BUCKET_NAME,
            entityId: bookId,
            entityName: '',
        });

        await this.repo.uploadImage(imageId, bookId);
    }
}
