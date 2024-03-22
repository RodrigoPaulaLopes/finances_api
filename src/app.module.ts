import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DebtsModule } from './debts/debts.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import {ConfigModule} from "@nestjs/config"
import { User } from './users/entities/user.entity';
import {Debt} from "./debts/entities/debt.entity"
@Module({
  imports: [ConfigModule.forRoot() ,TypeOrmModule.forRoot({
    type: 'mysql',
    host:  'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    entities: [User, Debt],
    synchronize: true
  }),UsersModule, DebtsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
