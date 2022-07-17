import { PrismaService } from '../../database/prisma/prisma.service';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(channelId: string, phoneNumberCustomer: string, product: string, additional: string, additionalCount: string, category: string, observation: string): Promise<void>;
}
