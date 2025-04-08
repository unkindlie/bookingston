/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    applyDecorators,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class Intercept implements NestInterceptor {
    constructor(private message: string) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((_) => {
                return { message: this.message };
            }),
        );
    }
}

export const MessageInterceptor = (message: string) =>
    applyDecorators(UseInterceptors(new Intercept(message)));
