import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt-access') {
    handleRequest<TUser = any>(err: any, user: any): TUser {
        return user ?? null;
    }
}
