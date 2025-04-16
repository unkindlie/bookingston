import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('RefreshTokens')
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        name: 'refresh_token',
    })
    token: string;

    @CreateDateColumn({
        name: 'refresh_token_creation_date',
    })
    tokenCreationDate: Date;

    // TODO: for future when normal frontend will be available
    @Column({
        name: 'refresh_token_user_browser_id',
        nullable: true,
    })
    browserId: string;

    @ManyToOne(() => UserEntity, {
        onDelete: 'CASCADE',
        cascade: true,
    })
    @JoinColumn({ name: 'refresh_token_user_id' })
    user: UserEntity;
}
