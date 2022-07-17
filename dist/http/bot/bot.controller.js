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
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
let BotController = class BotController {
    constructor(botService) {
        this.botService = botService;
    }
    step1(req) {
        return this.botService.step1(req.channelId);
    }
    step2(req) {
        return this.botService.step2(req.channelId);
    }
    step3(req) {
        return this.botService.step3(req.category, req.channelId);
    }
    step301(req) {
        return this.botService.step301(req.product, req.category, req.channelId);
    }
    step31(req) {
        console.log(req);
        return this.botService.step31(req.product, req.category, req.channelId, req.additional);
    }
};
__decorate([
    (0, common_1.Post)('/step1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "step1", null);
__decorate([
    (0, common_1.Post)('/step2'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "step2", null);
__decorate([
    (0, common_1.Post)('/step3'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "step3", null);
__decorate([
    (0, common_1.Post)('/step3.0.1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "step301", null);
__decorate([
    (0, common_1.Post)('/step3.1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "step31", null);
BotController = __decorate([
    (0, common_1.Controller)('bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotController);
exports.BotController = BotController;
//# sourceMappingURL=bot.controller.js.map