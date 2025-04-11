import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        const status = exception.getStatus();

        res.status(status).json({
            statusCode: status,
            data: null,
            error: {
                name: exception.getResponse()['error'],
                cause: exception.getResponse()['message'],
                date: new Date().toISOString(),
                path: req.path,
            },
        });
    }
}
