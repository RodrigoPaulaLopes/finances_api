import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { EmailDto } from './dto/send-code-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post("/login")
  async login(@Body() data: AuthDto) {
    return await this.authService.login(data);
  }

  @Post("/send-code")
  async send_code(@Body() email: EmailDto) {
    return await this.authService.sendCode(email);
  }
 
}
