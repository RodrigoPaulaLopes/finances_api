import { PartialType } from '@nestjs/mapped-types';
import { CreateDebtDto } from './create-debt.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDebtDto extends PartialType(CreateDebtDto) {
    @IsNotEmpty()
    @IsString()
    id: string
}
