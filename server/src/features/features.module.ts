import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [BookModule, ImageModule, UserModule],
})
export class FeaturesModule {}
