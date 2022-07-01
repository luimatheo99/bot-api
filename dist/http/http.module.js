"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const database_module_1 = require("../database/database.module");
const bot_controller_1 = require("./bot/bot.controller");
const bot_service_1 = require("./bot/bot.service");
const carts_controller_1 = require("./carts/carts.controller");
const carts_service_1 = require("./carts/carts.service");
const restaurantAdditional_controller_1 = require("./restaurants/additional/restaurantAdditional.controller");
const restaurantAdditional_service_1 = require("./restaurants/additional/restaurantAdditional.service");
const restaurantcategories_controller_1 = require("./restaurants/categories/restaurantcategories.controller");
const restaurantCategories_service_1 = require("./restaurants/categories/restaurantCategories.service");
const restaurants_controller_1 = require("./restaurants/restaurants.controller");
const restaurants_service_1 = require("./restaurants/restaurants.service");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
let HttpModule = class HttpModule {
};
HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '1000000000s' },
                verifyOptions: {
                    ignoreExpiration: true,
                },
            }),
        ],
        controllers: [
            restaurants_controller_1.RestaurantsController,
            restaurantcategories_controller_1.RestaurantCategoriesController,
            restaurantAdditional_controller_1.RestaurantAdditionalController,
            users_controller_1.UsersController,
            bot_controller_1.BotController,
            carts_controller_1.CartsController,
        ],
        providers: [
            restaurants_service_1.RestaurantsService,
            restaurantCategories_service_1.RestaurantCategoriesService,
            restaurantAdditional_service_1.RestaurantAdditionalService,
            users_service_1.UsersService,
            bot_service_1.BotService,
            carts_service_1.CartsService,
        ],
    })
], HttpModule);
exports.HttpModule = HttpModule;
//# sourceMappingURL=http.module.js.map