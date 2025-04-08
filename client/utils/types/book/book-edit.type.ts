import { TBookDetailed } from './book-detailed.type';

export type TBookEdit = Omit<TBookDetailed, 'images'>;