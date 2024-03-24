import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../users/enums/roles.enum';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/login-auth.dto';
import { TokenDto } from './dto/token.dto';

describe('AuthService', () => {
  let service: AuthService;
  let users: User[] = [{
    name: "Rodrigo",
    last_name: "Lopes",
    email: "rodrigo.plopesti@gmail.com",
    username: "rodrigoplopes1",
    password: "$2b$10$fU2IlCLTKENaqZ0Re28HfuNv1gYs7Tkp2YEeZODzJMfjQB0tMSeMu",
    role: Role.USER,
    userPasswordCode: null,
    id: "822d756e-0fa8-421d-90a3-962f1236a595"
  }]
  let repository: Repository<User>
  let token: TokenDto = { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZmZlNjhkYi1kMzUwLTQwMTAtYmI4Yy1mMjM0YTA1MmY4MzYiLCJ1c2VybmFtZSI6InJvZHJpZ29wbG9wZXMiLCJlbWFpbCI6InJvZHJpZ28ucGxvcGVzdGlAZ21haWwuY29tIiwiaWF0IjoxNzExMTI4MTg1LCJleHAiOjE3MTExMjgyNDV9.mVvAedZrTyl7u-el74XfvLuKMGsAt8LARJIXdsAYwH8" }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getRepositoryToken(User), useValue: {
          exists: jest.fn().mockResolvedValue(false),
          save: jest.fn().mockResolvedValue(users[0]),
          findOne: jest.fn().mockResolvedValue(users[0]),
          update: jest.fn()
        }
      }, {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        },
        {
          provide: MailService,
          useValue: {
            sendEmail: jest.fn()
          }
        },],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get(getRepositoryToken(User))

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("register method", () => {
    it('should create a new user', async () => {

      const data: CreateUserDto = { name: "Rodrigo", last_name: 'lopes', email: "rodrigo.lpoes@email.com", username: "rodrigo", password: "Rl@1234!" }
      const result = await service.register(data)

      expect(result).toEqual(users[0])
    })

    it('should return a Unauthorized Exception if user or password is invalid', async () => {
      const data: CreateUserDto = { name: "Rodrigo", last_name: 'lopes', email: "rodrigo.lpoes@email.com", username: "rodrigo", password: "Rl@1234!" }

      jest.spyOn(repository, 'exists').mockResolvedValueOnce(true)


      await expect(service.register(data)).rejects.toThrow(UnauthorizedException)

    })
  })

  describe("login method", () => {
    it("Should return a token", async () => {

      const user: AuthDto = { username: users[0].username, password: users[0].password }
      jest.spyOn(service, 'login').mockResolvedValue(token)
      const result = await service.login(user)

      expect(result).toEqual(token)
    })
    it("Should return a invalid user or password", async () => {

      const user: AuthDto = { username: users[0].username, password: users[0].password }

      jest.spyOn(service, 'login').mockRejectedValue(new NotFoundException('Invalid username or password.'))


      await expect(service.login(user)).rejects.toThrow('Invalid username or password')
    })
  })
});
