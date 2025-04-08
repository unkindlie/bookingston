import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { BookEntity } from '../book/book.entity';
import { ImageEntity } from '../image/image.entity';

@Entity('BookImages')
export class BookImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity;

    @OneToOne(() => ImageEntity)
    @JoinColumn({ name: 'image_id' })
    image: ImageEntity;
}
