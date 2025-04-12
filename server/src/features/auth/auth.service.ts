import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UserService } from '../user/user.service';
import { UserPayloadDto } from '../user/dto/user-payload.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(
        emailAddress: string,
        password: string,
    ): Promise<UserPayloadDto> {
        const user =
            await this.userService.getUserByEmailOrNickname(emailAddress);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordEqual = await compare(password, user.password);
        if (!isPasswordEqual) {
            throw new ForbiddenException('Invalid password');
        }

        return plainToInstance(UserPayloadDto, user, {
            excludeExtraneousValues: true,
        });
    }
}
