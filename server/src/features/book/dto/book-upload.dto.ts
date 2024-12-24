import {
    IsDecimal,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Min,
} from 'class-validator';

export class BookUploadDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsString()
    @Length(20, 120)
    name: string;

    @IsOptional()
    @IsString()
    @Length(150, 740)
    description?: string;

    @IsDecimal({ decimal_digits: '2,2' })
    price: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;
}
