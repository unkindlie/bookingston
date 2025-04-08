import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers() {
        return this.userRepo.getUsers();
    }
}