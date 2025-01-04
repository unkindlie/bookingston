import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ImageRepository } from './image.repository';
import { SupabaseStorageService } from '../../common/supabase/supabase-storage.service';

@Injectable()
export class ImageService {
    constructor(
        private repo: ImageRepository,
        private storageService: SupabaseStorageService,
    ) {}

    async uploadImage(
        image: Express.Multer.File,
        bucketName: string,
    ): Promise<string> {
        const { data, error } = await this.storageService.uploadFileToBucket(
            image,
            bucketName,
        );
        if (!data) {
            throw new UnprocessableEntityException(
                'Error uploading file',
                error.message,
            );
        }

        const fullPath = this.storageService.getFileUrl(data.path, bucketName);
        const id = await this.repo.addImage(fullPath);

        return id;
    }
}
