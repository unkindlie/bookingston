import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { MessageResponse } from '../../common/util/types/types';
import { AuthService } from './auth.service';
import { RefreshCookieInterceptor } from './interceptors/refresh-cookie.interceptor';
import { ClearRefreshCookieInterceptor } from './interceptors/clear-refresh-cookie.interceptor';
import { User } from './decorators/user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserPayloadDto } from '../user/dto/user-payload.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GoogleGuard } from './guards/google.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { RoleGuard } from './guards/role.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async createUser(@Body() body: UserCreateDto): Promise<MessageResponse> {
        await this.service.register(body);

        return { message: 'User created successfully' };
    }

    @Public()
    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: AuthResponseDto) {
        return user;
    }

    @Get('current-user')
    getUser(@User() user: UserPayloadDto) {
        return user;
    }

    @UseInterceptors(ClearRefreshCookieInterceptor)
    @Post('logout')
    logout(): MessageResponse {
        return { message: 'User logged out successfully' };
    }

    @Public()
    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@User() user: AuthResponseDto) {
        return user;
    }

    @Public()
    @UseGuards(GoogleGuard)
    @Get('google/login')
    googleLogin() {}

    @Public()
    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleCallback(@User() user: AuthResponseDto) {
        return user;
    }

    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(RoleGuard)
    @Get('role-test')
    roleRoute() {
        return { message: 'Working' };
    }
}
