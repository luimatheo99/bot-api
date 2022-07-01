import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { BotController } from './bot/bot.controller';
import { BotService } from './bot/bot.service';
import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { RestaurantAdditionalController } from './restaurants/additional/restaurantAdditional.controller';
import { RestaurantAdditionalService } from './restaurants/additional/restaurantAdditional.service';
import { RestaurantCategoriesController } from './restaurants/categories/restaurantcategories.controller';
import { RestaurantCategoriesService } from './restaurants/categories/restaurantCategories.service';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { RestaurantsService } from './restaurants/restaurants.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1000000000s' },
      verifyOptions: {
        ignoreExpiration: true,
      },
    }),
  ],
  controllers: [
    RestaurantsController,
    RestaurantCategoriesController,
    RestaurantAdditionalController,

    UsersController,

    BotController,

    CartsController,
  ],
  providers: [
    RestaurantsService,
    RestaurantCategoriesService,
    RestaurantAdditionalService,

    UsersService,

    BotService,

    CartsService,
  ],
})
export class HttpModule {}
