import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BotService } from './bot.service';

interface IReqPhoneNumberTwillio {
  phoneNumberTwillio: string;
}

interface IReqStep3 {
  category: string;
  phoneNumberTwillio: string;
}

interface IReqStep31 {
  product: string;
  category: string;
  phoneNumberTwillio: string;
}

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('/step1')
  step1(@Body() req: IReqPhoneNumberTwillio) {
    return this.botService.step1(req.phoneNumberTwillio);
  }

  @Post('/step2')
  step2(@Body() req: IReqPhoneNumberTwillio) {
    return this.botService.step2(req.phoneNumberTwillio);
  }

  @Post('/step3')
  step3(@Body() req: IReqStep3) {
    return this.botService.step3(req.category, req.phoneNumberTwillio);
  }

  @Post('/step3.0.1')
  step31(@Body() req: IReqStep31) {
    return this.botService.step301(
      req.product,
      req.category,
      req.phoneNumberTwillio,
    );
  }
}
