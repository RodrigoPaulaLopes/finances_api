import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserDecorator } from 'src/param-decorators/user.decorator';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@UserDecorator() user: User, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@UserDecorator() user: User, @Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@UserDecorator() user: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@UserDecorator() user: User, @Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
