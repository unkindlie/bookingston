import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ExposingSerialization } from '../../common/decorators/exposing-serialization.decorator';
import { UserShortDto } from './dto/user-short.dto';
import { PaginationDto } from '../../common/util/dto/pagingation.dto';
import { PaginatedDataDto } from '../../common/util/dto/paginated-data.dto';
import { UserDetailedDto } from './dto/user-detailed.dto';
import { MessageResponse } from '../../common/util/types/types';
import { UserEditDto } from './dto/user-edit.dto';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';
import { Public } from '../../common/decorators/public.decorator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaginatedUserShortItems = new (PaginatedDataDto(UserShortDto))();

@UseGuards(AccessTokenGuard)
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
    @Public()
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
