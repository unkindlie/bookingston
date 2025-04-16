import { Expose, Type } from 'class-transformer';

export function PaginatedDataDto<T>(cls: new () => T) {
    class Cls {
        @Expose()
        @Type(() => cls)
        items: T[];

        @Expose()
        page: number;

        @Expose()
        take: number;
    }
    return Cls;
}
