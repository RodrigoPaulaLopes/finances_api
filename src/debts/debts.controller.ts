import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { User as UserDecorator } from 'src/param-decorators/user.decorator';
import { userInfo } from 'os';
import { User } from 'src/users/entities/user.entity';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@UserDecorator() user: User, @Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.create(user, createDebtDto);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.debtsService.findAll(user);
  }

  @Get(':id')
  findOne(@UserDecorator() user: User, @Param('id') id: string) {
    return this.debtsService.findOne(user, id);
  }

  @Patch(':id')
  update(@UserDecorator() user: User, @Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.update(user, id, updateDebtDto);
  }

  @Delete(':id')
  remove(@UserDecorator() user: User, @Param('id') id: string) {
    return this.debtsService.remove(id);
  }
}
