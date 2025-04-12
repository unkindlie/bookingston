import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../../features/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'emailOrNick',
        });
    }

    validate(emailOrNick: string, password: string) {
        return this.authService.validateUser(emailOrNick, password);
    }
}
