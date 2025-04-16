import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Role } from '../../user/enums/role.enum';
import { UserPayloadDto } from '../../user/dto/user-payload.dto';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const user = context.switchToHttp().getRequest<Request>()
            .user as UserPayloadDto;
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getClass(),
            context.getHandler(),
        ]);

        console.log(user.roles, roles);

        return user.roles.some((userRole) => roles.includes(userRole));
    }
}
