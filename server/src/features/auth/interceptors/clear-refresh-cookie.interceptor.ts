import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { delayWhen, Observable } from 'rxjs';

import { CookieHelper } from '../../../common/helpers/cookie.helper';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { REFRESH_TOKEN_KEY } from '../constants/auth.constants';

@Injectable()
export class ClearRefreshCookieInterceptor implements NestInterceptor {
    constructor(
        private cookieHelper: CookieHelper,
        private refreshTokenService: RefreshTokenService,
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            delayWhen(async () => {
                const res = context.switchToHttp().getResponse<Response>();
                const { refreshToken } = context
                    .switchToHttp()
                    .getRequest<Request>().cookies;

                await this.refreshTokenService.removeToken(refreshToken);

                this.cookieHelper.clearCookie(REFRESH_TOKEN_KEY, res);
            }),
        );
    }
}
