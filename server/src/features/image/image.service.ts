import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { ImageRepository } from './image.repository';
import { SupabaseStorageService } from '../../common/supabase/supabase-storage.service';
import { ImagePayloadDto } from './dto/image-payload.dto';
import { randonSymbolString } from '../../common/util/helpers/generate.helpers';

@Injectable()
export class ImageService {
    constructor(
        private repo: ImageRepository,
        private storageService: SupabaseStorageService,
    ) {}

    async uploadImage(
        image: Express.Multer.File,
        payload: ImagePayloadDto,
    ): Promise<string> {
        const { originalname: on } = image;

        const imageExt = '.' + on.split('.').at(-1);
        const imageName = randonSymbolString(15) + imageExt;

        image.originalname = imageName;

        const { data, error } = await this.storageService.uploadFileToBucket(
            image,
            payload.bucketName,
        );
        if (!data) {
            throw new UnprocessableEntityException(
                'Error uploading file',
                error.message,
            );
        }

        const fullPath = this.storageService.getFileUrl(
            data.path,
            payload.bucketName,
        );
        const id = await this.repo.addImage(fullPath);

        return id;
    }
}
