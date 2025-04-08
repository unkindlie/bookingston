import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Min,
} from 'class-validator';

export class BookEditDto {
    @IsUUID()
    id: string;

    @IsString()
    @Length(20, 120)
    name: string;

    @IsOptional()
    @IsString()
    @Length(50, 740)
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    quantity?: number;
}
