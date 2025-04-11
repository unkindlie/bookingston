import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';
import { UserEditDto } from './dto/user-edit.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getUsers(input: PaginationDto): Promise<UserEntity[]> {
        return await this.repo.find({
            take: input.take,
            skip: input.take * (input.page - 1),
        });
    }
    async getUserByCondition(
        condition: FindOptionsWhere<UserEntity>,
    ): Promise<UserEntity> {
        const user = await this.repo.findOneBy(condition);
        if (!user) {
            throw new NotFoundException("Such user doesn't exist");
        }

        return user;
    }
    async createUser(input: UserCreateDto): Promise<void> {
        const entity = this.repo.create(input);

        await this.repo.insert(entity);
    }
    async editUserInfo(input: UserEditDto): Promise<void> {
        const { id, ...info } = input;

        await this.repo.update(id, info);
    }
    async deleteUser(userId: number): Promise<void> {
        const entity = await this.repo.preload({ id: userId });

        await this.repo.remove(entity);
    }
    async checkIfUserExists(
        options: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
    ): Promise<boolean> {
        return await this.repo.existsBy(options);
    }
}
