import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantsCategoriesController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): any;
    createCategory(createRestaurantCategoryDto: CreateRestaurantDto): any;
}
