import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantMenuDto } from './dto/create-restaurant-menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant-menu.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<void>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<void>;
    findById(id: string): Promise<import(".prisma/client").Restaurant>;
    findAllMenu(id: string): Promise<import(".prisma/client").Menu[]>;
    createMenu(id: string, createRestaurantMenuDto: CreateRestaurantMenuDto): Promise<void>;
    updateMenu(id: string, nameMenu: string, updateRestaurantMenuDto: UpdateRestaurantMenuDto): Promise<void>;
    findMenuByName(id: string, nameMenu: string): Promise<import(".prisma/client").Menu>;
}
