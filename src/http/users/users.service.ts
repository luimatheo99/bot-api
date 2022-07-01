import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SigninUserDto } from './dto/signin-user.dto';

import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async signin(signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;
    const user = await this.findByEmail(email);
    if (!user) {
      const strErr = 'Usuário não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      const strErr = 'senha inválida';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.sign({
      email: user.email,
      name: user.name,
      id: user.id,
    });

    return { token, user };
  }
}
