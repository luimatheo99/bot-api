import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateRestaurantCategoryDto } from './dto/create-restaurant-category.dto';
import { UpdateRestaurantCategoryDto } from './dto/update-restaurant-category.dto';
export declare class RestaurantCategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantCategoryDto: CreateRestaurantCategoryDto): Promise<void>;
    findAll(idRestaurant: string): Promise<import(".prisma/client").RestaurantCategory[]>;
    update(id: string, updateRestaurantCategoryDto: UpdateRestaurantCategoryDto): Promise<void>;
}
