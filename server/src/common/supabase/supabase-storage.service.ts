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
        const { data, error } = await this.storageClient
            .from(bucketName)
            .upload(file.originalname, file.buffer, {
                contentType: file.mimetype,
            });

        return { data, error };
    }
    async getFileUrl(publicUrl: string, bucketName: string) {
        const {
            data: { publicUrl: url },
        } = this.storageClient.from(bucketName).getPublicUrl(publicUrl);

        return url;
    }
}
