import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class GuestOnlyGuard
    extends AuthGuard('jwt-access')
    implements CanActivate
{
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>();

        if (req.user) {
            throw new ForbiddenException('You are already authenticated');
        }

        return true;
    }
}
