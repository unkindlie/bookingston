import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpInterceptor } from './common/interceptors/http.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: 'http://localhost:' + process.env.CLIENT_PORT },
    });

    app.use(cookieParser());

    app.useGlobalInterceptors(new HttpInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
