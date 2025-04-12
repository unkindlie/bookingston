import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class UserEditDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description: string;
}
