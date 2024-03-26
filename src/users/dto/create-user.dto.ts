import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator'
import { Role } from '../enums/roles.enum'
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    last_name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

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


    @IsString()
    @IsNotEmpty()
    role: Role

}
