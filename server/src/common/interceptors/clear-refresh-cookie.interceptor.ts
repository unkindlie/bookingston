import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { delayWhen, Observable } from 'rxjs';
import { CookieHelper } from '../helpers/cookie.helper';
import { RefreshTokenService } from '../../features/refresh-token/refresh-token.service';

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
                // TODO: add constant for token
                this.cookieHelper.clearCookie('refreshToken', res);
            }),
        );
    }
}
