import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

import { CookieHelper } from '../helpers/cookie.helper';
import { AuthResponseDto } from '../../features/auth/dto/auth-response.dto';

@Injectable()
export class RefreshCookieInterceptor implements NestInterceptor {
    constructor(private cookieHelper: CookieHelper) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: AuthResponseDto) => {
                const res = context.switchToHttp().getResponse<Response>();
                const {
                    tokens: { refreshToken },
                } = data;

                this.cookieHelper.setCookie('refreshToken', refreshToken, res);

                return data;
            }),
        );
    }
}
