import { CreateRestaurantAdditionalDto } from './dto/create-restaurant-additional.dto';
import { UpdateRestaurantAdditionalDto } from './dto/update-restaurant-additional.dto';
import { RestaurantCategoriesService } from './restaurantCategories.service';
export declare class RestaurantCategoriesController {
    private readonly restaurantCategoriesService;
    constructor(restaurantCategoriesService: RestaurantCategoriesService);
    create(idRestaurant: string, createRestaurantCategoryDto: CreateRestaurantAdditionalDto): Promise<void>;
    findAll(idRestaurant: string): Promise<import(".prisma/client").RestaurantCategory[]>;
    update(id: string, updateRestaurantCategoryDto: UpdateRestaurantAdditionalDto): Promise<void>;
}
