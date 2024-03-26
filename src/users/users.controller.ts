import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserDecorator } from 'src/param-decorators/user.decorator';
import { User } from './entities/user.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { ChangePasswordDto } from './dto/change-password-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@UserDecorator() user: User, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll(@UserDecorator() user: User) {
    
    return this.usersService.findAll();
  }

  @Get("/current-user")
  get_current_user(@UserDecorator() user: User){

    return this.usersService.get_current_user(user)
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@UserDecorator() user: User, @Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@UserDecorator() current_user: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put()
  update_current_user(@UserDecorator() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update_current_user(user, updateUserDto);
  }
  @Put("/new-password")
  change_password(@UserDecorator() user: User, @Body() change_pass: ChangePasswordDto) {
    return this.usersService.change_password(user, change_pass);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@UserDecorator() user: User, @Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
