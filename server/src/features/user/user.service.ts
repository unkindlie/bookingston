import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';
import { UserEditDto } from './dto/user-edit.dto';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(pagination: PaginationDto): Promise<UserEntity[]> {
        return await this.userRepo.getUsers(pagination);
    }
    async getUserById(id: number): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({ id });
    }
    async getUserByNickname(userNickname: string): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({
            nickname: userNickname,
        });
    }
    async getUserByEmail(emailAddress: string): Promise<UserEntity> {
        return await this.userRepo.getUserByCondition({
            emailAddress,
        });
    }
    async createUser(input: UserCreateDto): Promise<void> {
        const exists = await this.userRepo.checkIfUserExists([
            { name: input.name },
            input.nickname && { nickname: input.nickname },
            { emailAddress: input.emailAddress },
        ]);
        if (exists) {
            throw new ConflictException(
                'User with such information already exists',
            );
        }

        const { password, ...rest } = input;
        const hashedPw = await hash(password, 3);

        // TODO: at this point I still need to think about generating nickname on frontend
        if (!rest.nickname) {
            rest.nickname =
                input.name.toLowerCase().replaceAll(' ', '') +
                Math.floor(Math.random() * 1000000);
        }

        await this.userRepo.createUser({ ...rest, password: hashedPw });
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
}
