import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
export class ChangePasswordDto { 
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    old_password: string
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    new_password: string
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    confirm_new_password: string

}
