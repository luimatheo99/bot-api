import { CreateRestaurantCategoryDto } from './dto/create-restaurant-category.dto';
import { UpdateRestaurantCategoryDto } from './dto/update-restaurant-category.dto';
import { RestaurantCategoriesService } from './restaurantCategories.service';
export declare class RestaurantCategoriesController {
    private readonly restaurantCategoriesService;
    constructor(restaurantCategoriesService: RestaurantCategoriesService);
    create(idRestaurant: string, createRestaurantCategoryDto: CreateRestaurantCategoryDto): Promise<void>;
    findAll(idRestaurant: string): Promise<import(".prisma/client").RestaurantCategory[]>;
    update(id: string, updateRestaurantCategoryDto: UpdateRestaurantCategoryDto): Promise<void>;
}
