import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class EmailDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

   
}
