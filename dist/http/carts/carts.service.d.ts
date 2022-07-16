import { PrismaService } from '../../database/prisma/prisma.service';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(phoneNumberMessageBird: string, phoneNumberCustomer: string, product: string, additional: string, category: string, observation: string): Promise<void>;
}
