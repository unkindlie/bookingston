import { Type } from 'class-transformer';
import {
    IsDecimal,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Min,
} from 'class-validator';

export class BookAddDto {
    @IsString()
    @Length(20, 120)
    name: string;

    @IsOptional()
    @IsString()
    @Length(50, 740)
    description?: string;

    @IsDecimal({ decimal_digits: '0,2' })
    price: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    quantity?: number;
}
