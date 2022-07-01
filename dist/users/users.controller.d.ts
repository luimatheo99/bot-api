import { UsersService } from './users.service';
import { SigninUserDto } from './dto/signin-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signin(signinUserDto: SigninUserDto): Promise<{
        token: string;
        user: import(".prisma/client").User;
    }>;
}
