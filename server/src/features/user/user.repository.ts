import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
    }
    async getUserByCondition(condition: FindOptionsWhere<UserEntity>) {
        const user = await this.repo.findOneBy(condition);
        if (!user) {
            throw new NotFoundException("Such user doesn't exist");
        }

        return user;
    }
}
