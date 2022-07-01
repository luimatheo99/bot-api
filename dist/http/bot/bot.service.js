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
const prisma_service_1 = require("../../database/prisma/prisma.service");
let BotService = class BotService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async step1() {
        const restaurant = await this.prisma.restaurant.findFirst();
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
        const message = `Olá {nome}\nEste é um canal de *Auto Atendimento*, não há uma pessoa lendo suas mensagens e não visualizamos imagens, vídeos ou áudios. Você deve informar apenas o que lhe for solicitado e sempre aguardar a resposta.\n\n*Informações*\nHorários de atendimentos:\n${schedules}Contato/Dúvidas: ${restaurant.phoneNumber}`;
        return { message };
    }
    async step2() {
        const restaurantCategories = await this.prisma.restaurantCategory.findMany({
            where: { idRestaurant: '62b9e729021fd14206937cf4' },
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
        const message = `Informe uma das opcões ( *apenas o número* )\n\n*MENU*\n\n*Categorias*\n${categories}`;
        return { message, options };
    }
    async step3(category) {
        var _a;
        const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
            where: {
                idRestaurant: '62b9e729021fd14206937cf4',
                order: Number(category),
            },
        });
        const restaurant = await this.prisma.restaurant.findFirst({
            where: { id: '62b9e729021fd14206937cf4' },
            select: {
                menu: true,
            },
        });
        const menus = restaurant.menu;
        let message = '*LANCHES*\n\nInforme a *Quantidade X Opção* que você deseja ( *apenas o número* ). Se for apenas um, informe apenas sua opção.\n\n';
        let menusMessageFormatted = '';
        let index = 0;
        let options = '';
        let additionalCount = 0;
        for (const menu of menus) {
            if (menu.category === restaurantCategory.description) {
                index++;
                options += index + ',';
                menusMessageFormatted += `*${index}*- ${menu.name} (${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(Number(menu.price))})${((_a = menu === null || menu === void 0 ? void 0 : menu.description) === null || _a === void 0 ? void 0 : _a.length) > 0 ? `\n-> ${menu.description}` : ''}\n`;
                additionalCount += menu.additional.length > 0 ? 1 : 0;
            }
        }
        message += `${menusMessageFormatted}\nOu envie *#* para voltar`;
        return { message, options, additionalCount };
    }
};
BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map