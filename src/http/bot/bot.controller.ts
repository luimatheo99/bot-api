import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

interface IReqPhoneNumberMessageBird {
  phoneNumberMessageBird: string;
}

interface IReqStep3 {
  category: string;
  phoneNumberMessageBird: string;
}

interface IReqStep301 extends IReqStep3 {
  product: string;
  additional: string;
}

interface IReqStep302 extends IReqStep301 {
  additional: string;
}

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('/step1')
  step1(@Body() req: IReqPhoneNumberMessageBird) {
    return this.botService.step1(req.phoneNumberMessageBird);
  }

  @Post('/step2')
  step2(@Body() req: IReqPhoneNumberMessageBird) {
    return this.botService.step2(req.phoneNumberMessageBird);
  }

  @Post('/step3')
  step3(@Body() req: IReqStep3) {
    return this.botService.step3(req.category, req.phoneNumberMessageBird);
  }

  @Post('/step3.0.1')
  step301(@Body() req: IReqStep301) {
    return this.botService.step301(
      req.product,
      req.category,
      req.phoneNumberMessageBird,
    );
  }

  @Post('/step3.0.2')
  step302(@Body() req: IReqStep302) {
    return this.botService.step302(
      req.additional,
      req.product,
      req.category,
      req.phoneNumberMessageBird,
    );
  }

  @Post('/step3.1')
  step31(@Body() req: IReqStep301) {
    console.log(req);
    return this.botService.step31(
      req.product,
      req.category,
      req.phoneNumberMessageBird,
      req.additional,
    );
  }
}
