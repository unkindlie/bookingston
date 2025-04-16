import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY, JWT_ACCESS_KEY } from '../constants/auth.constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard(JWT_ACCESS_KEY) {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getClass(),
            context.getHandler(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}
