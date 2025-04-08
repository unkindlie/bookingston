import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';

export class UserCreateDto {
    @IsString()
    name: string;

    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minSymbols: 1,
            minUppercase: 0,
            minLowercase: 0,
            minNumbers: 0,
        },
        { message: "Password doesn't meet the requirements" },
    )
    @MaxLength(32)
    password: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsEmail()
    emailAddress: string;
}
