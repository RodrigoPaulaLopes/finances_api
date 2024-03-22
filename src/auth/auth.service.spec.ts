import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../users/enums/roles.enum';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getRepositoryToken(User), useValue: {
          exists: jest.fn(),
          save: jest.fn().mockResolvedValue(users[0]),
          findOne: jest.fn(),
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

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("register method", () => {
    it('should create a new user', async () => {

      const data: CreateUserDto = { name: "Rodrigo", last_name: 'lopes', email: "rodrigo.lpoes@email.com", username: "rodrigo", password: "Rl@1234!" }
      const result = await service.register(data)

      expect(result).toEqual(users[0])
    })
  })
});
