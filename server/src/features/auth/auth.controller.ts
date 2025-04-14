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

import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { MessageResponse } from '../../common/util/types/types';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../../common/guards/access-token.guard';
import { RefreshCookieInterceptor } from '../../common/interceptors/refresh-cookie.interceptor';
import { ClearRefreshCookieInterceptor } from '../../common/interceptors/clear-refresh-cookie.interceptor';
import { User } from '../../common/decorators/user.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserPayloadDto } from '../user/dto/user-payload.dto';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { GuestOnlyGuard } from '../../common/guards/guest-only.guard';
import { OptionalJwtGuard } from '../../common/guards/optional-jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @UseGuards(OptionalJwtGuard, GuestOnlyGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async createUser(@Body() body: UserCreateDto): Promise<MessageResponse> {
        await this.service.register(body);

        return { message: 'User created successfully' };
    }

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(OptionalJwtGuard, GuestOnlyGuard, LocalAuthGuard)
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
}
