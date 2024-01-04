import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
              private readonly jwtService:JwtService){}


  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where:{
        email: createUserDto.email
      }
    })
    if(existUser){
      throw new HttpException('This email already exist', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password)
    })
    const payload = this.jwtService.sign({email:createUserDto.email})
    return {user, payload}
  }


  async findOne(email: string) {
    return await this.userRepository.findOne({
      where:{
        email: email
      }
    });
  }

  

}
