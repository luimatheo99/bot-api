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
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const formattedPhoneNumberMessageBird_1 = require("../../utils/functions/formattedPhoneNumberMessageBird");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const carts_service_1 = require("../carts/carts.service");
let BotService = class BotService {
    constructor(prisma, cartsService) {
        this.prisma = prisma;
        this.cartsService = cartsService;
    }
    async step1(phoneNumberMessageBird) {
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                phoneNumberMessageBird: phoneNumberMessageBirdFormatted,
            },
        });
        let schedules = '';
        for (const schedule of restaurant.schedules) {
            if (schedule.active) {
                let day = '';
                if (schedule.day === 'sun') {
                    day = 'Domingo';
                }
                else if (schedule.day === 'mon') {
                    day = 'Segunda-feira';
                }
                else if (schedule.day === 'tue') {
                    day = 'Terça-feira';
                }
                else if (schedule.day === 'wed') {
                    day = 'Quarta-feira';
                }
                else if (schedule.day === 'thu') {
                    day = 'Quinta-feira';
                }
                else if (schedule.day === 'fri') {
                    day = 'Sexta-feira';
                }
                else if (schedule.day === 'sat') {
                    day = 'Sábado';
                }
                schedules += `  - ${day}: ${schedule.startTime} às ${schedule.endTime}\n`;
            }
        }
        const messageStep1 = `Olá\nEste é um canal de *Auto Atendimento*, não há uma pessoa lendo suas mensagens e não visualizamos imagens, vídeos ou áudios. Você deve informar apenas o que lhe for solicitado e sempre aguardar a resposta.\n\n*Informações*\nHorários de atendimentos:\n${schedules}Contato/Dúvidas: ${restaurant.phoneNumber}`;
        return { messageStep1 };
    }
    async step2(phoneNumberMessageBird) {
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                phoneNumberMessageBird: phoneNumberMessageBirdFormatted,
            },
        });
        const restaurantCategories = await this.prisma.restaurantCategory.findMany({
            where: { idRestaurant: restaurant.id },
            orderBy: [{ order: 'asc' }],
        });
        let categories = '';
        let index = 0;
        let options = '';
        for (const category of restaurantCategories) {
            index++;
            options += index + ',';
            if (category) {
                categories += `*${category.order}*- ${category.description}\n`;
            }
        }
        options = `[1-${index}]`;
        const messageStep2 = `Informe uma das opcões ( *apenas o número* )\n\n*MENU*\n\n*Categorias*\n${categories}`;
        return { messageStep2, optionsStep2: options };
    }
    async step3(category, phoneNumberMessageBird) {
        var _a;
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
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
        const menus = restaurant.menu;
        let message = `*${restaurantCategory.description}*\n\nInforme a *Quantidade X Opção* que você deseja ( *apenas o número* ). Se for apenas um, informe apenas sua opção.\n\n`;
        let menusMessageFormatted = '';
        let index = 0;
        let options = '';
        let additionalCount = 0;
        for (const menu of menus) {
            if (menu.category === restaurantCategory.description) {
                index++;
                menusMessageFormatted += `*${index}*- ${menu.name} (${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(Number(menu.price))})${((_a = menu === null || menu === void 0 ? void 0 : menu.description) === null || _a === void 0 ? void 0 : _a.length) > 0 ? `\n-> ${menu.description}` : ''}\n`;
                additionalCount += menu.additional.length > 0 ? 1 : 0;
            }
        }
        options = `[1-${index}]`;
        message += `${menusMessageFormatted}\nOu envie *#* para voltar`;
        return {
            messageStep3: message,
            optionsStep3: options,
            additionalCountStep3: additionalCount,
        };
    }
    async step301(product, category, phoneNumberMessageBird) {
        var _a;
        const item = Number(product.toLocaleLowerCase().split('x')[1].trim());
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
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
        let message = `*${menu.name} - ${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(Number(menu.price))}*${((_a = menu === null || menu === void 0 ? void 0 : menu.description) === null || _a === void 0 ? void 0 : _a.length) > 0 ? `\n-> ${menu.description}` : ''}\n\n*Adicionais*\n`;
        let additionalMessageFormatted = '';
        let index = 0;
        for (const additional of menu.additional) {
            index++;
            additionalMessageFormatted += `*${index}*- ${additional.description} (${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(Number(additional.price))})\n`;
        }
        message += `${additionalMessageFormatted}\n\nInforme somente o número dos adicionais que deseja separado por (,) virgula ou envie a palavra *OK* para continuar\n\nOu envie *#* para voltar`;
        return { messageStep301: message };
    }
    async step302(additional, product, category, phoneNumberMessageBird) {
    }
    async step31(product, category, phoneNumberMessageBird, additional) {
        var _a;
        const quantity = product.toLocaleLowerCase().split('x')[0].trim();
        const item = Number(product.toLocaleLowerCase().split('x')[1].trim());
        const additionalArray = additional.split(',');
        const phoneNumberMessageBirdFormatted = await (0, formattedPhoneNumberMessageBird_1.formattedPhoneNumberMessageBird)(phoneNumberMessageBird);
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
        let additionalMessage = '';
        if (additionalArray[0].toLocaleUpperCase() !== 'OK') {
            for (const additionalItem of additionalArray) {
                const additionalDescription = menu.additional[parseInt(additionalItem.trim()) - 1].description;
                additionalMessage += `  -${additionalDescription}\n`;
            }
        }
        const message = `*${quantity}un. - ${menu.name} (${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(Number(menu.price))})*${((_a = menu === null || menu === void 0 ? void 0 : menu.description) === null || _a === void 0 ? void 0 : _a.length) > 0 ? `\n-> ${menu.description}` : ''}\n${additionalMessage ? `-> Adicionais:\n${additionalMessage}\n` : '\n'}Escreva alguma observação(Ex.: Retirar grãos e bacon) ou envie a palavra *OK* para continuar\n\nOu envie # para voltar`;
        return { messageStep31: message };
    }
};
BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        carts_service_1.CartsService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map