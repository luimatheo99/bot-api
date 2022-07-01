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
var _a;
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
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map