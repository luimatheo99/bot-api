import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.usersService.signin(signinUserDto);
  }
}
