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
exports.RestaurantAdditionalController = void 0;
const common_1 = require("@nestjs/common");
const authorization_guard_1 = require("../../../utils/guards/authorization.guard");
const create_restaurant_additional_dto_1 = require("./dto/create-restaurant-additional.dto");
const update_restaurant_additional_dto_1 = require("./dto/update-restaurant-additional.dto");
const restaurantAdditional_service_1 = require("./restaurantAdditional.service");
let RestaurantAdditionalController = class RestaurantAdditionalController {
    constructor(restaurantAdditionalService) {
        this.restaurantAdditionalService = restaurantAdditionalService;
    }
    create(idRestaurant, createRestaurantCategoryDto) {
        createRestaurantCategoryDto.idRestaurant = idRestaurant;
        return this.restaurantAdditionalService.create(createRestaurantCategoryDto);
    }
    findAll(idRestaurant) {
        return this.restaurantAdditionalService.findAll(idRestaurant);
    }
    findById(idRestaurant, id) {
        return this.restaurantAdditionalService.findById(idRestaurant, id);
    }
    update(id, updateRestaurantCategoryDto) {
        return this.restaurantAdditionalService.update(id, updateRestaurantCategoryDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('idRestaurant')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_restaurant_additional_dto_1.CreateRestaurantAdditionalDto]),
    __metadata("design:returntype", void 0)
], RestaurantAdditionalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('idRestaurant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantAdditionalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('idRestaurant')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RestaurantAdditionalController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(authorization_guard_1.AuthorizationGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurant_additional_dto_1.UpdateRestaurantAdditionalDto]),
    __metadata("design:returntype", void 0)
], RestaurantAdditionalController.prototype, "update", null);
RestaurantAdditionalController = __decorate([
    (0, common_1.Controller)('restaurants/:idRestaurant/additional'),
    __metadata("design:paramtypes", [restaurantAdditional_service_1.RestaurantAdditionalService])
], RestaurantAdditionalController);
exports.RestaurantAdditionalController = RestaurantAdditionalController;
//# sourceMappingURL=restaurantAdditional.controller.js.map