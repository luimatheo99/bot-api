import { PrismaService } from '../../database/prisma/prisma.service';
export declare class BotService {
    private prisma;
    constructor(prisma: PrismaService);
    step1(): Promise<{
        message: string;
    }>;
    step2(): Promise<{
        message: string;
        options: string;
    }>;
    step3(category: string): Promise<{
        message: string;
        options: string;
        additionalCount: number;
    }>;
}
