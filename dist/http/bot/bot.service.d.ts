import { PrismaService } from '../../database/prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
export declare class BotService {
    private prisma;
    private cartsService;
    constructor(prisma: PrismaService, cartsService: CartsService);
    step1(phoneNumberMessageBird: string): Promise<{
        messageStep1: string;
    }>;
    step2(phoneNumberMessageBird: string): Promise<{
        messageStep2: string;
        optionsStep2: string;
    }>;
    step3(category: string, phoneNumberMessageBird: string): Promise<{
        messageStep3: string;
        optionsStep3: string;
        additionalCountStep3: number;
    }>;
    step301(product: string, category: string, phoneNumberMessageBird: string): Promise<{
        messageStep301: string;
    }>;
    step302(additional: string, product: string, category: string, phoneNumberMessageBird: string): Promise<{
        message: string;
    }>;
}
