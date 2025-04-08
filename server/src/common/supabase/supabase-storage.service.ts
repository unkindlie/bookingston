import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { StorageClient } from '@supabase/storage-js';

@Injectable()
export class SupabaseStorageService {
    private storageClient: StorageClient;

    constructor(@Inject('SUPABASE_CLIENT') private client: SupabaseClient) {
        this.storageClient = client.storage;
    }

    async getBuckets() {
        return await this.client.storage.listBuckets();
    }
    async uploadFileToBucket(file: Express.Multer.File, bucketName: string) {
        const response = await this.storageClient
            .from(bucketName)
            .upload(file.originalname, file.buffer, {
                contentType: file.mimetype,
            });

        return response;
    }
    getFileUrl(fileUrl: string, bucketName: string): string {
        const {
            data: { publicUrl },
        } = this.storageClient.from(bucketName).getPublicUrl(fileUrl);

        return publicUrl;
    }
}
