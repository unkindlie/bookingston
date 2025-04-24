import { TBookBasic } from './book-basic.type';

export type TBookDetailed = TBookBasic & {
    description: string | null;
    price: number;
    quantity: number;
    images: unknown[];
}