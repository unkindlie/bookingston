import { Expose } from 'class-transformer';

export class UserShortDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;
}
