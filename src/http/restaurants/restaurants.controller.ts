import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantMenuDto } from './dto/create-restaurant-menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant-menu.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  findById(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }

  //MENU

  @Get(':id/menu')
  @UseGuards(AuthorizationGuard)
  findAllMenu(@Param('id') id: string) {
    return this.restaurantsService.findAllMenu(id);
  }

  @Post(':id/menu')
  @UseGuards(AuthorizationGuard)
  createMenu(
    @Param('id') id: string,
    @Body() createRestaurantMenuDto: CreateRestaurantMenuDto,
  ) {
    return this.restaurantsService.createMenu(id, createRestaurantMenuDto);
  }

  @Put(':id/menu/:name')
  @UseGuards(AuthorizationGuard)
  updateMenu(
    @Param('id') id: string,
    @Param('name') nameMenu: string,
    @Body() updateRestaurantMenuDto: UpdateRestaurantMenuDto,
  ) {
    return this.restaurantsService.updateMenu(
      id,
      nameMenu,
      updateRestaurantMenuDto,
    );
  }

  @Get(':id/menu/:name')
  @UseGuards(AuthorizationGuard)
  findMenuByName(@Param('id') id: string, @Param('name') nameMenu: string) {
    return this.restaurantsService.findMenuByName(id, nameMenu);
  }
}
