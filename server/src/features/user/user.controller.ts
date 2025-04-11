import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEntity } from './user.entity';
import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';
import { UserShortDto } from './dto/user-short.dto';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';
import { PaginatedDataDto } from '../../common/util/dto/paginated-data.dto';
import { UserDetailedDto } from './dto/user-detailed.dto';
import { MessageResponse } from '../../common/util/types/types';
import { UserEditDto } from './dto/user-edit.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaginatedUserShortItems = new (PaginatedDataDto(UserShortDto))();

@Controller('users')
export class UserController {
    constructor(private service: UserService) {}

    @ExposingSerialization(PaginatedDataDto(UserShortDto))
    @Get()
    async getUsers(
        @Query(new ValidationPipe({ skipMissingProperties: true }))
        pagination: PaginationDto,
    ): Promise<typeof PaginatedUserShortItems> {
        const items = await this.service.getUsers(pagination);
        return { items, ...pagination };
    }

    @ExposingSerialization(UserDetailedDto)
    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserEntity> {
        return await this.service.getUserById(id);
    }

    @ExposingSerialization(UserDetailedDto)
    @Get('by-nickname/:nick')
    async getUserByNickname(
        @Param('nick') nickname: string,
    ): Promise<UserEntity> {
        return await this.service.getUserByNickname(nickname);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createUser(@Body() body: UserCreateDto): Promise<MessageResponse> {
        await this.service.createUser(body);

        return { message: 'User created successfully' };
    }

    @Patch('edit-info')
    async editUserInfo(@Body() body: UserEditDto) {
        await this.service.editUserInfo(body);

        return { message: 'User updated successfully' };
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<MessageResponse> {
        await this.service.deleteUser(id);

        return { message: 'User deleted success' };
    }
}
