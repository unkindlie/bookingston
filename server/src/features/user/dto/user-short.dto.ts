import { Expose } from 'class-transformer';

import { Role } from '../enums/role.enum';

export class UserShortDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    roles: Role[];
}
