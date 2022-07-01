import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from '@prisma/client';
import { CreateRestaurantMenuDto } from './dto/create-restaurant-menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant-menu.dto';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<void>;
    findById(id: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<void>;
    createMenu(id: string, createRestaurantMenuDto: CreateRestaurantMenuDto): Promise<void>;
    updateMenu(id: string, nameMenu: string, updateRestaurantMenuDto: UpdateRestaurantMenuDto): Promise<void>;
    findAllMenu(id: string): Promise<import(".prisma/client").Menu[]>;
    findMenuByName(id: string, nameMenu: string): Promise<import(".prisma/client").Menu>;
}
