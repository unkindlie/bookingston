import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [BookModule, ImageModule, UserModule, AuthModule],
})
export class FeaturesModule {}
