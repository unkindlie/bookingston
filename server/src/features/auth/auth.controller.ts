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
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshCookieInterceptor } from '../../common/interceptors/refresh-cookie.interceptor';
import { ClearRefreshCookieInterceptor } from '../../common/interceptors/clear-refresh-cookie.interceptor';
import { User } from '../../common/decorators/user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserPayloadDto } from '../user/dto/user-payload.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GoogleGuard } from './guards/google.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async createUser(@Body() body: UserCreateDto): Promise<MessageResponse> {
        await this.service.register(body);

        return { message: 'User created successfully' };
    }

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: AuthResponseDto) {
        return user;
    }

    @UseGuards(AccessTokenGuard)
    @Get('current-user')
    getUser(@User() user: UserPayloadDto) {
        return user;
    }

    @UseGuards(AccessTokenGuard)
    @UseInterceptors(ClearRefreshCookieInterceptor)
    @Post('logout')
    logout(): MessageResponse {
        return { message: 'User logged out successfully' };
    }

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@User() user: AuthResponseDto) {
        return user;
    }

    @UseGuards(GoogleGuard)
    @Get('google/login')
    googleLogin() {}

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    googleCallback(@User() user: any) {
        return user;
    }

    @Roles(Role.EDITOR, Role.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get('role-test')
    roleRoute() {
        return { message: 'Working' };
    }
}
