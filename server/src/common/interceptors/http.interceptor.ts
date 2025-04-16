import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const httpCtx = context.switchToHttp();

        const res = httpCtx.getResponse<Response>();

        return next.handle().pipe(
            map((data) => ({
                statusCode: res.statusCode,
                data: data || null,
                error: null,
            })),
        );
    }
}
