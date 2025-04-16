import { Expose } from 'class-transformer';

import { Role } from '../enums/role.enum';

export class UserPayloadDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    emailAddress: string;

    @Expose()
    roles: Role[];
}
