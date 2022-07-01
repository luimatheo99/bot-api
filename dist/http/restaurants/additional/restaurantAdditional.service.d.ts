import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateRestaurantAdditionalDto } from './dto/create-restaurant-additional.dto';
import { UpdateRestaurantAdditionalDto } from './dto/update-restaurant-additional.dto';
export declare class RestaurantAdditionalService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantAdditionalDto: CreateRestaurantAdditionalDto): Promise<void>;
    findById(idRestaurant: string, id: string): Promise<import(".prisma/client").RestaurantAdditional>;
    findAll(idRestaurant: string): Promise<import(".prisma/client").RestaurantAdditional[]>;
    update(id: string, updateRestaurantAdditionalDto: UpdateRestaurantAdditionalDto): Promise<void>;
}
