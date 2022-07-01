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
import { CreateRestaurantAdditionalDto } from './dto/create-restaurant-additional.dto';
import { UpdateRestaurantAdditionalDto } from './dto/update-restaurant-additional.dto';
import { RestaurantAdditionalService } from './restaurantAdditional.service';

@Controller('restaurants/:idRestaurant/additional')
export class RestaurantAdditionalController {
  constructor(
    private readonly restaurantAdditionalService: RestaurantAdditionalService,
  ) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  create(
    @Param('idRestaurant') idRestaurant: string,
    @Body() createRestaurantCategoryDto: CreateRestaurantAdditionalDto,
  ) {
    createRestaurantCategoryDto.idRestaurant = idRestaurant;
    return this.restaurantAdditionalService.create(createRestaurantCategoryDto);
  }

  @Get()
  findAll(@Param('idRestaurant') idRestaurant: string) {
    return this.restaurantAdditionalService.findAll(idRestaurant);
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  findById(
    @Param('idRestaurant') idRestaurant: string,
    @Param('id') id: string,
  ) {
    return this.restaurantAdditionalService.findById(idRestaurant, id);
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  update(
    @Param('id') id: string,
    @Body() updateRestaurantCategoryDto: UpdateRestaurantAdditionalDto,
  ) {
    return this.restaurantAdditionalService.update(
      id,
      updateRestaurantCategoryDto,
    );
  }
}
