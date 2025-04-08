import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
        nullable: true,
    })
    nickname: string;
}
