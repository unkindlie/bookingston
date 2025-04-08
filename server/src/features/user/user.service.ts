import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepo.getUsers();
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ id: id });
    }
    async getUserByNickname(userNickname: string) {
        return await this.userRepo.getUserByCondition({
            nickname: userNickname,
        });
    }
    async createUser(input: UserCreateDto): Promise<void> {
        await this.userRepo.createUser(input);
    }
    async deleteUser(id: number): Promise<void> {
        await this.userRepo.deleteUser(id);
    }
}
