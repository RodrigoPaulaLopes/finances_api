import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from "../users/enums/roles.enum"
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from "bcrypt"
import { AuthDto } from './dto/login-auth.dto';
import { TokenDto } from './dto/token.dto';
import { EmailDto } from './dto/send-code-email.dto';
import { MailService } from '../mail/mail.service';
import { MessageDto } from '../mail/dtos/message.dto';
import { ChangePassowrdDto } from './dto/change-password-auth.dto ';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, 
    private readonly jwtService: JwtService, 
    private readonly mail: MailService) { }

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
    if (!user) throw new NotFoundException("Invalid username or password.");

    if (!await compare(password, user.password)) throw new NotFoundException("Invalid username or password.");

    const payload = { sub: user.id, username: user.username, email: user.email };
    const access_token: TokenDto = { access_token: this.jwtService.sign(payload) }
    return access_token
  }
  async sendCode(data: EmailDto) {
    const user = await this.userRepository.findOne({ where: { email: data.email } })
    if (!user)
      throw new NotFoundException('Invalid Email.');

    const code = Math.floor(Math.random() * 90000) + 10000;

    await this.userRepository.update(user.id, { userPasswordCode: code })
    const message: MessageDto = {
      from_address: data.email,
      to_name: user.name,
      to_address: user.email,
      from_name: user.name,
      subject: "Change your password code",
      html: `<p>Your code is: ${code}</p>`
    }
    this.mail.sendEmail(message)
  }

  async changePassowrd(data: ChangePassowrdDto){
    const user = await this.userRepository.findOne({where: {userPasswordCode: data.code}})

    
    if (!user) throw new BadRequestException("Invalid Code");

    const hash_pass = await hash(data.password, 10)
    return await this.userRepository.update(user.id, {password: hash_pass, userPasswordCode: null})

    
    
  }
}