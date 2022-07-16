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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const formattedPhoneNumberMessageBird_1 = require("../../utils/functions/formattedPhoneNumberMessageBird");
const prisma_service_1 = require("../../database/prisma/prisma.service");
let CartsService = class CartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(phoneNumberMessageBird, phoneNumberCustomer, product, additional, category, observation) {
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
        const quantity = parseInt(product.toLocaleLowerCase().split('x')[0].trim());
        const item = Number(product.toLocaleLowerCase().split('x')[1].trim());
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                phoneNumberMessageBird: phoneNumberMessageBirdFormatted,
            },
            select: {
                id: true,
                menu: true,
            },
        });
        const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
            where: {
                idRestaurant: restaurant.id,
                order: Number(category),
            },
        });
        const menusByCategory = [];
        const menus = restaurant.menu;
        for (const menu of menus) {
            if (menu.category === restaurantCategory.description) {
                menusByCategory.push(menu);
            }
        }
        const menu = menusByCategory[item - 1];
        const cart = await this.prisma.restaurantCarts.findFirst({
            where: { customer: { phoneNumber: phoneNumberCustomer } },
        });
        if (!cart) {
            const cartNew = {
                customer: {
                    phoneNumber: phoneNumberCustomer,
                },
                idRestaurant: restaurant.id,
                amount: menu.price * quantity,
                products: [
                    {
                        name: menu.name,
                        amount: menu.price,
                        description: menu.description,
                        quantity,
                        additional: [],
                        observation: observation.toUpperCase() === 'OK' ? '' : observation,
                    },
                ],
            };
            await this.prisma.restaurantCarts.create({
                data: cartNew,
            });
        }
        else {
            const cartUpdate = {
                amount: menu.price * quantity + cart.amount,
                products: [
                    ...cart.products,
                    {
                        name: menu.name,
                        amount: menu.price,
                        description: menu.description,
                        quantity,
                        additional: [],
                        observation: observation.toUpperCase() === 'OK' ? '' : observation,
                    },
                ],
            };
            await this.prisma.restaurantCarts.update({
                where: { id: cart.id },
                data: cartUpdate,
            });
        }
    }
};
CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map