import { PrismaService } from '../../database/prisma/prisma.service';
import { CartsService } from '../carts/carts.service';
export declare class BotService {
    private prisma;
    private cartsService;
    constructor(prisma: PrismaService, cartsService: CartsService);
    step1(channelId: string): Promise<{
        messageStep1: string;
    }>;
    step2(channelId: string): Promise<{
        messageStep2: string;
        optionsStep2: string;
    }>;
    step3(category: string, channelId: string): Promise<{
        messageStep3: string;
        optionsStep3: string;
        additionalCountStep3: number;
    }>;
    step301(product: string, category: string, channelId: string): Promise<{
        messageStep301: string;
    }>;
    step31(product: string, category: string, channelId: string, additional: string, additionalCount: string): Promise<{
        messageStep31: string;
    }>;
}
