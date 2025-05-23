import {
    ConflictException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UserService } from '../user/user.service';
import { UserPayloadDto } from '../user/dto/user-payload.dto';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { TokenHelper } from './helpers/token.helper';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { generateNickname } from './helpers/generate-nickname.helper';
import { UserEntity } from '../user/user.entity';

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

        const isPasswordEqual = await compare(password, user.password);
        if (!isPasswordEqual) throw new ForbiddenException('Invalid password');

        await this.refreshTokenService.checkForTokensAmount(user.id);

        const data = await this.returnPayloadWithTokens(user);

        await this.refreshTokenService.saveToken({
            token: data.tokens.refreshToken,
            userId: user.id,
        });

        return data;
    }
    async register(input: UserCreateDto): Promise<void> {
        const userExists = await this.userService.checkIfUserExists([
            input.nickname && { nickname: input.nickname },
            { emailAddress: input.emailAddress },
        ]);

        if (userExists) throw new ConflictException('Such user already exists');

        const { password, ...rest } = input;
        const hashedPw = await hash(password, 3);

        if (!rest.nickname) rest.nickname = generateNickname(rest.name);

        await this.userService.createUser({ ...rest, password: hashedPw });
    }
    async refresh(oldToken: string, userId: number): Promise<AuthResponseDto> {
        const user = await this.userService.getUserById(userId);

        const oldTokenExists =
            await this.refreshTokenService.checkIfTokenAvailable(oldToken);
        if (!oldTokenExists)
            throw new ForbiddenException(
                "Such token doesn't exist in the database",
            );

        const data = await this.returnPayloadWithTokens(user);

        await this.refreshTokenService.updateToken(
            oldToken,
            data.tokens.refreshToken,
        );

        return data;
    }
    async validateExternalUser(externalUser: UserCreateDto) {
        const userExists = await this.userService.checkIfUserExists({
            emailAddress: externalUser.emailAddress,
        });
        const getUser = async (): Promise<AuthResponseDto> => {
            return this.userService
                .getUserByEmailOrNickname(externalUser.emailAddress)
                .then((user) => this.returnPayloadWithTokens(user));
        };

        if (userExists) return await getUser();

        await this.userService.createUser(externalUser);
        return await getUser();
    }

    private async returnPayloadWithTokens(
        user: UserEntity,
    ): Promise<AuthResponseDto> {
        const payload = plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });
        const tokens = await this.generateTokens(payload);

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
