import { Expose } from 'class-transformer';

import { Role } from '../enums/role.enum';

export class UserDetailedDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    description: string;

    @Expose()
    roles: Role[];
}
