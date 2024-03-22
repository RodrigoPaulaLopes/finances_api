import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from "../users/enums/roles.enum"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from "bcrypt"
import { AuthDto } from './dto/login-auth.dto';
import { TokenDto } from './dto/token.dto';
@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) { }
  async register(data: CreateUserDto) {

    if (await this.userRepository.exists({ where: { username: data.username } })) {
      throw new UnauthorizedException("error in your username or password!")
    }

    const new_pass = await hash(data.password, 10)

    const user: User = { ...data, password: new_pass, role: Role.USER }
    return await this.userRepository.save(user)

  }

  async login({ username, password }: AuthDto) {
    const user = await this.userRepository.findOne({ where: { username: username } })
    if (!user) {
      throw new NotFoundException("Invalid username or password.");
    }

    if (!await compare(password, user.password)) throw new NotFoundException("Invalid username or password.");

    const payload = { sub: user.id, username: user.username };
    const access_token: TokenDto = { access_token: this.jwtService.sign(payload) }
    return access_token


  }
}