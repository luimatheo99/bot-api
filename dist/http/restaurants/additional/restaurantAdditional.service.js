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
exports.RestaurantAdditionalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let RestaurantAdditionalService = class RestaurantAdditionalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRestaurantAdditionalDto) {
        await this.prisma.restaurantAdditional.create({
            data: {
                description: createRestaurantAdditionalDto.description,
                price: Number(createRestaurantAdditionalDto.price),
                idRestaurant: createRestaurantAdditionalDto.idRestaurant,
            },
        });
    }
    async findById(idRestaurant, id) {
        return this.prisma.restaurantAdditional.findFirst({
            where: { idRestaurant, id },
        });
    }
    async findAll(idRestaurant) {
        return this.prisma.restaurantAdditional.findMany({
            where: { idRestaurant },
        });
    }
    async update(id, updateRestaurantAdditionalDto) {
        const restaurantAdditional = await this.prisma.restaurantAdditional.findUnique({
            where: { id },
        });
        if (!restaurantAdditional) {
            const strErr = 'Adicional não existe!';
            throw new common_1.HttpException(strErr, common_1.HttpStatus.NOT_FOUND);
        }
        await this.prisma.restaurantAdditional.update({
            data: {
                description: updateRestaurantAdditionalDto.description,
                price: Number(updateRestaurantAdditionalDto.price),
                idRestaurant: updateRestaurantAdditionalDto.idRestaurant,
            },
            where: {
                id,
            },
        });
    }
};
RestaurantAdditionalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantAdditionalService);
exports.RestaurantAdditionalService = RestaurantAdditionalService;
//# sourceMappingURL=restaurantAdditional.service.js.map