import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor (private service: UserService) {}

    @Get('test')
    returnTest() {
        return 'Test';
    }

    @Get()
    async getUsers() {
        return await this.service.getUsers();
    }
}
