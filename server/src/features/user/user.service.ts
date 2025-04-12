import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';
import { UserEditDto } from './dto/user-edit.dto';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(pagination: PaginationDto): Promise<UserEntity[]> {
        return await this.userRepo.getUsers(pagination);
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ id });
    }
    async getUserByNickname(nickname: string): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ nickname });
    }
    async getUserByEmailOrNickname(emailOrNick: string): Promise<UserEntity> {
        const isStringEmail = isEmail(emailOrNick);

        return await this.userRepo.getUserByCondition({
            [isStringEmail ? 'emailAddress' : 'nickname']: emailOrNick,
        });
    }
    async createUser(input: UserCreateDto): Promise<void> {
        await this.userRepo.createUser(input);
    }
    async editUserInfo(input: UserEditDto) {
        await this.userRepo.editUserInfo(input);
    }
    async deleteUser(id: number): Promise<void> {
        const exists = await this.userRepo.checkIfUserExists({ id });
        if (!exists) {
            throw new NotFoundException("Such user doesn't exists");
        }

        await this.userRepo.deleteUser(id);
    }
    async checkIfUserExistsBeforeReg(
        options: Record<string, unknown> | Array<Record<string, unknown>>,
    ) {
        const exists = await this.userRepo.checkIfUserExists(options);
        if (exists) {
            throw new ConflictException(
                'User with such information already exists',
            );
        }

        return;
    }
}
