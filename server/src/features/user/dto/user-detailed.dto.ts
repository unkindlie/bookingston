import { Expose } from 'class-transformer';

export class UserDetailedDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    description: string;
}
