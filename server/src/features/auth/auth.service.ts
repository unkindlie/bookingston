import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UserService } from '../user/user.service';
import { UserPayloadDto } from '../user/dto/user-payload.dto';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { TokenHelper } from '../../common/helpers/token.helper';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private refreshTokenService: RefreshTokenService,
        private tokenHelper: TokenHelper,
    ) {}

    async login(
        emailAddress: string,
        password: string,
    ): Promise<AuthResponseDto> {
        const user =
            await this.userService.getUserByEmailOrNickname(emailAddress);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordEqual = await compare(password, user.password);
        if (!isPasswordEqual) {
            throw new ForbiddenException('Invalid password');
        }

        // TODO: need to think on proper implementation of this feature
        await this.refreshTokenService.checkForTokensAmount(user.id);

        const payload = plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });
        const tokens = await this.generateTokens(payload);

        await this.refreshTokenService.saveToken({
            token: tokens.refreshToken,
            userId: user.id,
        });

        return { user: payload, tokens };
    }
    async register(input: UserCreateDto): Promise<void> {
        await this.userService.checkIfUserExistsBeforeReg([
            input.nickname && { nickname: input.nickname },
            { emailAddress: input.emailAddress },
        ]);

        const { password, ...rest } = input;
        const hashedPw = await hash(password, 3);

        // TODO: at this point I still need to think about generating nickname on frontend
        if (!rest.nickname) {
            rest.nickname =
                input.name.toLowerCase().replaceAll(' ', '') +
                Math.floor(Math.random() * 1000000);
        }

        await this.userService.createUser({ ...rest, password: hashedPw });
    }
    async refresh(oldToken: string, userId: number): Promise<AuthResponseDto> {
        const user = await this.userService.getUserById(userId);

        await this.refreshTokenService.checkForTokensAmount(userId);

        const oldTokenExists =
            await this.refreshTokenService.checkIfTokenAvailable(oldToken);
        if (!oldTokenExists) {
            throw new ForbiddenException(
                "Such token doesn't exist in the database",
            );
        }

        const payload = plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });

        const tokens = await this.generateTokens(payload);

        await this.refreshTokenService.updateToken(
            oldToken,
            tokens.refreshToken,
        );

        return { user: payload, tokens };
    }
    private async generateTokens(
        payload: UserPayloadDto,
    ): Promise<JwtTokensDto> {
        const accessToken = await this.tokenHelper.generateAccessToken(payload);
        const refreshToken =
            await this.tokenHelper.generateRefreshToken(payload);

        return { accessToken, refreshToken };
    }
}
