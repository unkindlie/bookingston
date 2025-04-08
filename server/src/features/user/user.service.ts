import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepo.getUsers();
    }
    async getUserById(userId: number): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ id: userId });
    }
}
