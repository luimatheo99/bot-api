import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BotService } from './bot.service';

interface IRequestStep3 {
  category: string;
}

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('/step1')
  step1() {
    return this.botService.step1();
  }

  @Post('/step2')
  step2() {
    return this.botService.step2();
  }

  @Post('/step3')
  step3(@Body() req: IRequestStep3) {
    return this.botService.step3(req.category);
  }
}
