import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        name: 'user_name',
    })
    name: string;

    @Column({
        name: 'user_password',
    })
    password: string;

    @Column({
        name: 'user_description',
        length: 500,
        nullable: true,
    })
    description: string;

    @Column({
        name: 'user_nickname',
    })
    nickname: string;

    @Column({
        name: 'user_email_address',
        unique: true,
    })
    emailAddress: string;

    @Column({
        name: 'user_roles',
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.DEFAULT],
    })
    roles: Role[];
}
