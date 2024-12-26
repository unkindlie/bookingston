import { Expose } from 'class-transformer';

import { BookShortDto } from './book-short.dto';

export class BookDetailedDto extends BookShortDto {
    @Expose()
    description: string;
}
