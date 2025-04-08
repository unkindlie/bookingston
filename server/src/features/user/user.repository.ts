import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    ) {}

    async getUsers() {
        return await this.repo.find();
    }
}
