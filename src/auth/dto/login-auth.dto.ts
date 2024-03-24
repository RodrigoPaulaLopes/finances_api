import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class AuthDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string
}
