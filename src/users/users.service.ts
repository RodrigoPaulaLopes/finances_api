import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {hash} from "bcrypt"
import { Role } from './enums/roles.enum';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!await this.userRepository.exists({ where: { id: id } })) throw new NotFoundException("User not found!")

    return await this.userRepository.findOne({where: {id: id}})
  }

  async update(id: string, updateUserDto: UpdateUserDto, current_user_id: string) {
    

    if (!await this.userRepository.exists({ where: { id: id } })) throw new NotFoundException("User not found!")


  }

  async update_current_user(user: User, updateUserDto: UpdateUserDto) {
    if (!await this.userRepository.exists({ where: { id: updateUserDto.id } })) throw new NotFoundException("User not found!")
  
    if (updateUserDto.id !== user.id) throw new UnauthorizedException("You cannot do this!")
    
    let user_updated: UpdateUserDto

    if (user.username === updateUserDto.username){
      user_updated = {
        email: updateUserDto.email,
        name: updateUserDto.name,
        last_name: updateUserDto.last_name,
        password: await hash(updateUserDto.password, 10),
        role: updateUserDto.role
      }
    }else {
      if (await this.userRepository.exists({ where: { username: updateUserDto.username } })) throw new NotFoundException("Username already exists!")
      user_updated = {
        email: updateUserDto.email,
        username: updateUserDto.username,
        name: updateUserDto.name,
        last_name: updateUserDto.last_name,
        password: await hash(updateUserDto.password, 10),
        role: updateUserDto.role
      }
    }
    
    return await this.userRepository.update(user.id, user_updated)
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
