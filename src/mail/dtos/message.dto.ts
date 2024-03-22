import { IsNotEmpty, IsString } from "class-validator"

export class MessageDto {
    @IsNotEmpty()
    @IsString()
    to_name: string

    @IsNotEmpty()
    @IsString()
    to_address: string

    @IsNotEmpty()
    @IsString()
    from_name: string

    @IsNotEmpty()
    @IsString()
    from_address: string

    @IsNotEmpty()
    @IsString()
    subject: string

    @IsNotEmpty()
    @IsString()
    html: string
}