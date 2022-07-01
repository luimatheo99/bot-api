"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const admin_guard_1 = require("../../../utils/guards/admin.guard");
let RestaurantsCategoriesController = class RestaurantsCategoriesController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    create(createRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
    createCategory(createRestaurantCategoryDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_restaurant_dto_1.CreateRestaurantDto !== "undefined" && create_restaurant_dto_1.CreateRestaurantDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], RestaurantsCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_restaurant_dto_1.CreateRestaurantDto !== "undefined" && create_restaurant_dto_1.CreateRestaurantDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RestaurantsCategoriesController.prototype, "createCategory", null);
RestaurantsCategoriesController = __decorate([
    (0, common_1.Controller)('restaurants/categories'),
    __metadata("design:paramtypes", [typeof (_c = typeof restaurants_service_1.RestaurantsService !== "undefined" && restaurants_service_1.RestaurantsService) === "function" ? _c : Object])
], RestaurantsCategoriesController);
exports.RestaurantsCategoriesController = RestaurantsCategoriesController;
//# sourceMappingURL=categories.controller.js.map