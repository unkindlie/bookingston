import {
    applyDecorators,
    ClassSerializerInterceptor,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';

export interface Type<T = any> {
    new (...args: any[]): T;
}

export const ExposingSerialization = (type: Type<any>) =>
    applyDecorators(
        UseInterceptors(ClassSerializerInterceptor),
        SerializeOptions({
            type,
            excludeExtraneousValues: true,
        }),
    );
