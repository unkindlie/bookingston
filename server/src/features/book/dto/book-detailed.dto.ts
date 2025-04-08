import { Expose, Type } from 'class-transformer';

import { ImageEntity } from '../../image/image.entity';

export class BookDetailedDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    @Type(() => Number)
    price: number;

    @Expose()
    quantity: number;

    @Expose()
    description: string;

    @Expose()
    @Type(() => ImageEntity)
    images: Array<ImageEntity>;
}
