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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let RestaurantCategoriesService = class RestaurantCategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRestaurantCategoryDto) {
        await this.prisma.restaurantCategory.create({
            data: {
                description: createRestaurantCategoryDto.description,
                order: Number(createRestaurantCategoryDto.order),
                idRestaurant: createRestaurantCategoryDto.idRestaurant,
            },
        });
    }
    async findById(idRestaurant, id) {
        return this.prisma.restaurantCategory.findFirst({
            where: { idRestaurant, id },
        });
    }
    async findAll(idRestaurant) {
        return this.prisma.restaurantCategory.findMany({
            where: { idRestaurant },
        });
    }
    async update(id, updateRestaurantCategoryDto) {
        const restaurantCategory = await this.prisma.restaurantCategory.findUnique({
            where: { id },
        });
        if (!restaurantCategory) {
            const strErr = 'Categoria não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.restaurantCategory.update({
            data: {
                description: updateRestaurantCategoryDto.description,
                order: Number(updateRestaurantCategoryDto.order),
                idRestaurant: updateRestaurantCategoryDto.idRestaurant,
            },
            where: {
                id,
            },
        });
    }
};
RestaurantCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantCategoriesService);
exports.RestaurantCategoriesService = RestaurantCategoriesService;
//# sourceMappingURL=restaurantCategories.service.js.map