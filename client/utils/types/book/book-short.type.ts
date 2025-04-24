import { TBookBasic } from './book-basic.type';

export type TBookShort = TBookBasic & {
    price: number;
    quantity: number;
    imageUrl: string;
};
