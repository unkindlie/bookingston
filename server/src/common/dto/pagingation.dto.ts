import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    take: number = 10;
}
