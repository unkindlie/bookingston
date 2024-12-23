import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Books')
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'text',
        name: 'book_name',
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true,
        name: 'book_description',
    })
    description: string;

    @Column({
        scale: 2,
        type: 'numeric',
        precision: 10,
        name: 'book_price',
    })
    price: number;

    @Column({
        default: 0,
        name: 'book_quantity',
    })
    quantity: number;
}
