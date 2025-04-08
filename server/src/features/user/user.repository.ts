import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return await this.repo.find();
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
        const exists = await this.repo.existsBy([
            { name: input.name },
            input.nickname && { nickname: input.nickname },
            { emailAddress: input.emailAddress },
        ]);
        if (exists) {
            throw new ConflictException(
                'User with such information already exists',
            );
        }

        const entity = this.repo.create(input);

        await this.repo.insert(entity);
    }
    async deleteUser(userId: number): Promise<void> {
        const exists = await this.repo.existsBy({ id: userId });
        if (!exists) {
            throw new NotFoundException("Such user doesn't exists");
        }

        const entity = await this.repo.preload({ id: userId });

        await this.repo.remove(entity);
    }
}
