import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookImageEntity } from './book-image.entity';
import { ImageEntity } from '../image/image.entity';

@Injectable()
export class BookImageRepository {
    constructor(
        @InjectRepository(BookImageEntity)
        private repo: Repository<BookImageEntity>,
    ) {}

    async getTitleImageForBook(bookId: string): Promise<string> {
        const imageUrl = await this.repo.findOne({
            where: { book: { id: bookId } },
            select: { image: { url: true } },
            relations: ['image'],
        });

        return imageUrl.image.url;
    }
    async getImagesForBook(bookId: string): Promise<ImageEntity[]> {
        const images = await this.repo.find({
            where: { book: { id: bookId } },
            select: { image: { id: true, url: true } },
            relations: ['image'],
        });

        return images.map((entity) => entity.image);
    }
    async uploadImage(imageId: string, bookId: string) {
        const entity = this.repo.create({
            image: { id: imageId },
            book: { id: bookId },
        });

        await this.repo.insert(entity);
    }
    async getIdsForDeletion(bookId: string) {
        const imageIds = await this.repo.find({
            where: { book: { id: bookId } },
            select: {
                id: true,
                image: { id: true, url: true },
            },
        });

        return imageIds.map((entity) => entity.id);
    }
}
