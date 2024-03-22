import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from "../users/enums/roles.enum"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash } from "bcrypt"
@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, jwtService: JwtService) { }
  async register(data: CreateUserDto) {

    if (await this.userRepository.exists({ where: { username: data.username } })) {
      throw new UnauthorizedException("error in your username or password!")
    }

    const new_pass = await hash(data.password, 10)

    const user: User = { ...data, password: new_pass, role: Role.USER }
    return await this.userRepository.save(user)

  }
}