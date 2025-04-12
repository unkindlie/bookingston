import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { MessageResponse } from '../../common/util/types/types';
import { AuthService } from './auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async createUser(@Body() body: UserCreateDto): Promise<MessageResponse> {
        await this.service.register(body);

        return { message: 'User created successfully' };
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(JwtGuard)
    @Get('current-user')
    getUser(@Req() req: Request) {
        return req.user;
    }
}
