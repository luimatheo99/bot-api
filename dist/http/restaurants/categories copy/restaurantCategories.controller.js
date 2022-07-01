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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const authorization_guard_1 = require("../../../utils/guards/authorization.guard");
const create_restaurant_category_dto_1 = require("./dto/create-restaurant-category.dto");
const update_restaurant_category_dto_1 = require("./dto/update-restaurant-category.dto");
const restaurantCategories_service_1 = require("./restaurantCategories.service");
let RestaurantCategoriesController = class RestaurantCategoriesController {
    constructor(restaurantCategoriesService) {
        this.restaurantCategoriesService = restaurantCategoriesService;
    }
    create(idRestaurant, createRestaurantCategoryDto) {
        createRestaurantCategoryDto.idRestaurant = idRestaurant;
        return this.restaurantCategoriesService.create(createRestaurantCategoryDto);
    }
    findAll(idRestaurant) {
        return this.restaurantCategoriesService.findAll(idRestaurant);
    }
    update(id, updateRestaurantCategoryDto) {
        return this.restaurantCategoriesService.update(id, updateRestaurantCategoryDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('idRestaurant')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_restaurant_category_dto_1.CreateRestaurantCategoryDto]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('idRestaurant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_category_dto_1.UpdateRestaurantCategoryDto]),
    __metadata("design:returntype", void 0)
], RestaurantCategoriesController.prototype, "update", null);
RestaurantCategoriesController = __decorate([
    (0, common_1.Controller)('restaurants/:idRestaurant/categories'),
    __metadata("design:paramtypes", [restaurantCategories_service_1.RestaurantCategoriesService])
], RestaurantCategoriesController);
exports.RestaurantCategoriesController = RestaurantCategoriesController;
//# sourceMappingURL=restaurantCategories.controller.js.map