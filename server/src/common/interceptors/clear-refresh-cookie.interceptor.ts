import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';
import { CookieHelper } from '../helpers/cookie.helper';

@Injectable()
export class ClearRefreshCookieInterceptor implements NestInterceptor {
    constructor(private cookieHelper: CookieHelper) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            tap(() => {
                const res = context.switchToHttp().getResponse<Response>();

                // TODO: add constant for token
                this.cookieHelper.clearCookie('refreshToken', res);
            }),
        );
    }
}
