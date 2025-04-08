import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @Get()
    async getUsers() {
        return await this.service.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.service.getUserById(id);
    }

    @Get('by-nickname/:nick')
    async getUserByNickname(@Param('nick') nickname: string) {
        return await this.service.getUserByNickname(nickname);
    }

    @Post()
    async createUser(@Body(new ValidationPipe()) body: UserCreateDto) {
        await this.service.createUser(body);

        return { message: 'User created successfully' };
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this.service.deleteUser(id);

        return { message: 'User deleted success' };
    }
}
