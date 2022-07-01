import { PrismaService } from '../prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<void>;
}
