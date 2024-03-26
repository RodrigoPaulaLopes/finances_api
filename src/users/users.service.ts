import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from "bcrypt"
import { Role } from './enums/roles.enum';
import { ChangePasswordDto } from './dto/change-password-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.exists({ where: { username: createUserDto.username } })) throw new BadRequestException("User already exists")

    return await this.userRepository.save({ ...createUserDto, password: await hash(createUserDto.password, 10) })
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    if (!await this.userRepository.exists({ where: { id: id } })) throw new NotFoundException("User not found!")

    return await this.userRepository.findOne({where: {id: id}})
  }

  get_current_user(user: User){
    return user

  }
  async update(id: string, updateUserDto: UpdateUserDto) {


    if (!await this.userRepository.exists({ where: { id: id } })) throw new NotFoundException("User not found!")

    return await this.userRepository.update(id, { ...updateUserDto, password: await hash(updateUserDto.password, 10) })


  }

  async change_password(user: User, changePassowrdDto: ChangePasswordDto) {

    if (! await this.userRepository.exists({ where: { id: user.id } })) throw new NotFoundException("User not found!")


    if (! await compare(changePassowrdDto.old_password, user.password)) throw new BadRequestException("wrong old password")

    if (changePassowrdDto.new_password !== changePassowrdDto.confirm_new_password) throw new BadRequestException("password is not equal to confirm password")


    return await this.userRepository.update(user.id, { password: await hash(changePassowrdDto.new_password, 10) })
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

  async remove(id: string) {
    if (! await this.userRepository.findOne({ where: { id: id } })) throw new NotFoundException("User not found!")
    return await this.userRepository.delete(id)
  }
}
