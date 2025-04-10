import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(pagination: PaginationDto): Promise<UserEntity[]> {
        return await this.userRepo.getUsers(pagination);
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ id: id });
    }
    async getUserByNickname(userNickname: string): Promise<UserEntity> {
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
