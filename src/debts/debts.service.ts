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

  async findAll(user: User) {
    return await this.debtRepository.find({where: {user: {id: user.id}}})
  }

  async findOne(user: User, id: string) {
    if(!await this.debtRepository.exists({where: {id: id}})) throw new BadRequestException("Debt not found!")

    return await this.debtRepository.findOne({where: {id: id, user: {id: user.id}}})

  }

  async update(user: User, id: string, updateDebtDto: UpdateDebtDto) {
    if(!await this.debtRepository.exists({where: {id: id}})) throw new BadRequestException("Debt not found!")

    if(updateDebtDto.installments_number <= 0) throw new BadRequestException("Installments cannot be minus or equal 0")

    return await this.debtRepository.update(id, {...updateDebtDto, user: user})
  }

  async remove(id: string) {
    if(!await this.debtRepository.exists({where: {id: id}})) throw new BadRequestException("Debt not found!")

    return await this.debtRepository.delete(id)
  }
}
