import { CreateRestaurantAdditionalDto } from './dto/create-restaurant-additional.dto';
import { UpdateRestaurantAdditionalDto } from './dto/update-restaurant-additional.dto';
import { RestaurantAdditionalService } from './restaurantAdditional.service';
export declare class RestaurantAdditionalController {
    private readonly restaurantAdditionalService;
    constructor(restaurantAdditionalService: RestaurantAdditionalService);
    create(idRestaurant: string, createRestaurantCategoryDto: CreateRestaurantAdditionalDto): Promise<void>;
    findAll(idRestaurant: string): Promise<import(".prisma/client").RestaurantAdditional[]>;
    findById(idRestaurant: string, id: string): Promise<import(".prisma/client").RestaurantAdditional>;
    update(id: string, updateRestaurantCategoryDto: UpdateRestaurantAdditionalDto): Promise<void>;
}
