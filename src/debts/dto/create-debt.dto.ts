import { IsNotEmpty } from 'class-validator'
import { StatusPayment } from '../enums/status-payment.enum'
export class CreateDebtDto {
    @IsNotEmpty()
    name: string

    description: string


    value: number

    
    status: StatusPayment

    userId: string
}
