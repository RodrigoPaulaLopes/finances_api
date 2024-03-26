import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {

  constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) { }
  async use(req: any, res: any, next: () => void) {
    const { authorization } = req.headers

    if (!authorization) throw new UnauthorizedException("You must be authenticated!")

    const [bearer, token] = authorization.split(" ")

    if (bearer !== "Bearer") throw new UnauthorizedException("Invalid prefix!")

    try{
      const verified = this.jwtService.verify(token)
      const user = await this.userService.findOne(verified.sub)
      req.user = user
  
    }catch(error){
      throw new UnauthorizedException(error)
    }

    next();
  }
}
