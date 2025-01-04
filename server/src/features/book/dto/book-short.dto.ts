import { Expose, Transform } from 'class-transformer';

export class BookShortDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    @Transform(({ value }) => parseFloat(value))
    price: number;

    @Expose()
    quantity: number;

    @Expose()
    imageUrl: string;
}
