import { IsEmail } from 'class-validator';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
      private readonly userService:UserService,
      private readonly jwtService:JwtService
      ){}

  async validateUser(email: string, password: string){
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch) {
      return user
    }
    throw new UnauthorizedException('Email or password are wrong');
  }

  async login(user: IUser) {
    const payload = { id: user.id, email: user.email };
    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
 