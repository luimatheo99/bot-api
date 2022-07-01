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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const create_restaurant_dto_1 = require("./dto/create-restaurant.dto");
const admin_guard_1 = require("../../utils/guards/admin.guard");
const authorization_guard_1 = require("../../utils/guards/authorization.guard");
const update_restaurant_dto_1 = require("./dto/update-restaurant.dto");
const create_restaurant_menu_dto_1 = require("./dto/create-restaurant-menu.dto");
const update_restaurant_menu_dto_1 = require("./dto/update-restaurant-menu.dto");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    create(createRestaurantDto) {
        return this.restaurantsService.create(createRestaurantDto);
    }
    update(id, updateRestaurantDto) {
        return this.restaurantsService.update(id, updateRestaurantDto);
    }
    findById(id) {
        return this.restaurantsService.findById(id);
    }
    findAllMenu(id) {
        return this.restaurantsService.findAllMenu(id);
    }
    createMenu(id, createRestaurantMenuDto) {
        return this.restaurantsService.createMenu(id, createRestaurantMenuDto);
    }
    updateMenu(id, nameMenu, updateRestaurantMenuDto) {
        return this.restaurantsService.updateMenu(id, nameMenu, updateRestaurantMenuDto);
    }
    findMenuByName(id, nameMenu) {
        return this.restaurantsService.findMenuByName(id, nameMenu);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_dto_1.UpdateRestaurantDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/menu'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findAllMenu", null);
__decorate([
    (0, common_1.Post)(':id/menu'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_restaurant_menu_dto_1.CreateRestaurantMenuDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Put)(':id/menu/:name'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_restaurant_menu_dto_1.UpdateRestaurantMenuDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Get)(':id/menu/:name'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findMenuByName", null);
RestaurantsController = __decorate([
    (0, common_1.Controller)('restaurants'),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map