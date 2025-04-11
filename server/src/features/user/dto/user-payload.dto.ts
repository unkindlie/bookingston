import { Expose } from 'class-transformer';

export class UserPayloadDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    emailAddress: string;
}
