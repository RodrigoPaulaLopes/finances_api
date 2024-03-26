import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DebtsService {

  constructor(@InjectRepository(Debt) private readonly debtRepository: Repository<Debt>){}
  async create(user: User, createDebtDto: CreateDebtDto) {
    if(await this.debtRepository.exists({where: {name: createDebtDto.name}})) throw new BadRequestException("This debt already exists")

    if(createDebtDto.installments_number <= 0) throw new BadRequestException("Installments cannot be minus or equal 0")
    return await this.debtRepository.save({...createDebtDto, user: user})
  }

  findAll() {
    return `This action returns all debts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} debt`;
  }

  remove(id: number) {
    return `This action removes a #${id} debt`;
  }
}
