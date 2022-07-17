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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const bcryptjs_1 = require("bcryptjs");
let RestaurantsService = class RestaurantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRestaurantDto) {
        const restaurant = await this.prisma.restaurant.create({
            data: {
                name: createRestaurantDto.name,
                address: createRestaurantDto.address,
                phoneNumber: createRestaurantDto.phoneNumber,
                channelId: createRestaurantDto.channelId,
            },
        });
        if (!restaurant) {
            const strErr = 'Não foi possível cadastrar o restaurante';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        const hashPassword = await (0, bcryptjs_1.hash)(createRestaurantDto.user.password, 8);
        await this.prisma.user.create({
            data: {
                name: createRestaurantDto.user.name,
                email: createRestaurantDto.user.email,
                password: hashPassword,
                idRestaurant: restaurant.id,
            },
        });
    }
    async findById(id) {
        return this.prisma.restaurant.findUnique({
            where: { id },
        });
    }
    async update(id, updateRestaurantDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        });
        if (!restaurant) {
            const strErr = 'Restaurante não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.restaurant.update({
            data: {
                name: updateRestaurantDto.name,
                address: updateRestaurantDto.address,
                phoneNumber: updateRestaurantDto.phoneNumber,
                channelId: updateRestaurantDto.channelId,
                activeOrder: updateRestaurantDto.activeOrder,
                deliveryFee: updateRestaurantDto.deliveryFee,
                paymentTypes: updateRestaurantDto.paymentTypes,
                schedules: updateRestaurantDto.schedules,
                typesDelivery: updateRestaurantDto.typesDelivery,
            },
            where: {
                id,
            },
        });
    }
    async createMenu(id, createRestaurantMenuDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        });
        if (!restaurant) {
            const strErr = 'Restaurante não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
            where: { description: createRestaurantMenuDto.category },
        });
        if (!restaurantCategory) {
            const strErr = 'Categoria não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        if (createRestaurantMenuDto.subCategory) {
            const restaurantSubCategory = await this.prisma.restaurantSubCategory.findFirst({
                where: { description: createRestaurantMenuDto.subCategory },
            });
            if (!restaurantSubCategory) {
                const strErr = 'SubCategoria não existe!';
                throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
            }
        }
        for (const additional of createRestaurantMenuDto.additional) {
            const restaurantAdditional = await this.prisma.restaurantAdditional.findFirst({
                where: { description: additional.description },
            });
            if (!restaurantAdditional) {
                const strErr = `Adicional ${additional.description} não existe!`;
                throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
            }
        }
        await this.prisma.restaurant.update({
            data: {
                menu: [...restaurant.menu, createRestaurantMenuDto],
            },
            where: {
                id,
            },
        });
    }
    async updateMenu(id, nameMenu, updateRestaurantMenuDto) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
        });
        if (!restaurant) {
            const strErr = 'Restaurante não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
            where: { description: updateRestaurantMenuDto.category },
        });
        if (!restaurantCategory) {
            const strErr = 'Categoria não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        if (updateRestaurantMenuDto.subCategory) {
            const restaurantSubCategory = await this.prisma.restaurantSubCategory.findFirst({
                where: { description: updateRestaurantMenuDto.subCategory },
            });
            if (!restaurantSubCategory) {
                const strErr = 'SubCategoria não existe!';
                throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
            }
        }
        const restaurantMenuIndex = restaurant.menu.findIndex((menu) => {
            return menu.name === nameMenu;
        });
        if (restaurantMenuIndex < 0) {
            const strErr = 'Menu não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        for (const additional of updateRestaurantMenuDto.additional) {
            const restaurantAdditional = await this.prisma.restaurantAdditional.findFirst({
                where: { description: additional.description },
            });
            if (!restaurantAdditional) {
                const strErr = `Adicional ${additional.description} não existe!`;
                throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
            }
        }
        restaurant.menu[restaurantMenuIndex].name = updateRestaurantMenuDto.name;
        restaurant.menu[restaurantMenuIndex].price = updateRestaurantMenuDto.price;
        restaurant.menu[restaurantMenuIndex].category =
            updateRestaurantMenuDto.category;
        restaurant.menu[restaurantMenuIndex].description =
            updateRestaurantMenuDto.description;
        restaurant.menu[restaurantMenuIndex].active =
            updateRestaurantMenuDto.active;
        restaurant.menu[restaurantMenuIndex].subCategory =
            updateRestaurantMenuDto.subCategory;
        restaurant.menu[restaurantMenuIndex].additional =
            updateRestaurantMenuDto.additional;
        await this.prisma.restaurant.update({
            data: {
                menu: restaurant.menu,
            },
            where: {
                id,
            },
        });
    }
    async findAllMenu(id) {
        const menus = await this.prisma.restaurant.findMany({
            where: {
                id,
            },
            select: {
                menu: true,
            },
        });
        return menus[0].menu;
    }
    async findMenuByName(id, nameMenu) {
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                id,
            },
            select: {
                menu: true,
            },
        });
        return restaurant.menu.find((menu) => menu.name === nameMenu);
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map