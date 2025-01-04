import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ImageEntity } from './image.entity';

@Injectable()
export class ImageRepository {
    constructor(
        @InjectRepository(ImageEntity) private repo: Repository<ImageEntity>,
    ) {}

    async getImages(): Promise<ImageEntity[]> {
        return await this.repo.find({ order: { id: 'ASC' } });
    }
    async addImage(url: string): Promise<string> {
        const image = this.repo.create({ url });

        const entity = await this.repo.insert(image);

        return entity.identifiers.at(0)['id'];
    }
}
