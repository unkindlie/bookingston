import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupabaseModule } from '../../common/supabase/supabase.module';
import { ImageEntity } from './image.entity';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

@Module({
    imports: [TypeOrmModule.forFeature([ImageEntity]), SupabaseModule],
    providers: [ImageService, ImageRepository],
    exports: [ImageService],
})
export class ImageModule {}
