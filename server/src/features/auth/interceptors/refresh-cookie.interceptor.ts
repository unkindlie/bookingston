import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

import { CookieHelper } from '../../../common/helpers/cookie.helper';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { REFRESH_TOKEN_KEY } from '../constants/auth.constants';

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

                this.cookieHelper.setCookie(
                    REFRESH_TOKEN_KEY,
                    refreshToken,
                    res,
                );

                return data;
            }),
        );
    }
}
