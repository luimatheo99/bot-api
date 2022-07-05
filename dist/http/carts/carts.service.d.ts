import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto): Promise<void>;
}
