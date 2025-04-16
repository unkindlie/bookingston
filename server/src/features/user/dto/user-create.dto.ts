import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';

export class UserCreateDto {
    @IsString({ message: 'Name should be a string' })
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

    @IsString({ message: 'Nickname should be a string' })
    @IsOptional()
    nickname: string;

    @IsEmail(
        {},
        { message: 'The given string does not look like email address' },
    )
    emailAddress: string;
}
