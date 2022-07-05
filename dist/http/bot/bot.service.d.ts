import { PrismaService } from '../../database/prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
export declare class BotService {
    private prisma;
    private cartsService;
    constructor(prisma: PrismaService, cartsService: CartsService);
    step1(phoneNumberTwillio: string): Promise<{
        message: string;
    }>;
    step2(phoneNumberTwillio: string): Promise<{
        message: string;
        options: string;
    }>;
    step3(category: string, phoneNumberTwillio: string): Promise<{
        message: string;
        options: string;
        additionalCount: number;
    }>;
    step31(product: number, category: string, phoneNumberTwillio: string): Promise<{
        message: string;
    }>;
}
