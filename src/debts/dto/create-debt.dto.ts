import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { StatusPayment } from '../enums/status-payment.enum'
export class CreateDebtDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    expiration_date: Date
    @IsNotEmpty()
    @IsNumber()
    installments_number: number
    @IsNotEmpty()
    status: StatusPayment
}
