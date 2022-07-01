import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Get,
  Put,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { CreateRestaurantCategoryDto } from './dto/create-restaurant-category.dto';
import { UpdateRestaurantCategoryDto } from './dto/update-restaurant-category.dto';
import { RestaurantCategoriesService } from './restaurantCategories.service';

@Controller('restaurants/:idRestaurant/categories')
export class RestaurantCategoriesController {
  constructor(
    private readonly restaurantCategoriesService: RestaurantCategoriesService,
  ) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  create(
    @Param('idRestaurant') idRestaurant: string,
    @Body() createRestaurantCategoryDto: CreateRestaurantCategoryDto,
  ) {
    createRestaurantCategoryDto.idRestaurant = idRestaurant;
    return this.restaurantCategoriesService.create(createRestaurantCategoryDto);
  }

  @Get()
  findAll(@Param('idRestaurant') idRestaurant: string) {
    return this.restaurantCategoriesService.findAll(idRestaurant);
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  findById(
    @Param('idRestaurant') idRestaurant: string,
    @Param('id') id: string,
  ) {
    return this.restaurantCategoriesService.findById(idRestaurant, id);
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  update(
    @Param('id') id: string,
    @Body() updateRestaurantCategoryDto: UpdateRestaurantCategoryDto,
  ) {
    return this.restaurantCategoriesService.update(
      id,
      updateRestaurantCategoryDto,
    );
  }
}
