import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    findByEmail(email: string): Promise<User>;
    signin(signinUserDto: SigninUserDto): Promise<{
        token: string;
        user: User;
    }>;
}
