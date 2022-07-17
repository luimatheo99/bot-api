import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

interface IReqChannelId {
  channelId: string;
}

interface IReqStep3 {
  category: string;
  channelId: string;
}

interface IReqStep301 extends IReqStep3 {
  product: string;
  additional: string;
  additionalCount: string;
}

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('/step1')
  step1(@Body() req: IReqChannelId) {
    return this.botService.step1(req.channelId);
  }

  @Post('/step2')
  step2(@Body() req: IReqChannelId) {
    return this.botService.step2(req.channelId);
  }

  @Post('/step3')
  step3(@Body() req: IReqStep3) {
    return this.botService.step3(req.category, req.channelId);
  }

  @Post('/step3.0.1')
  step301(@Body() req: IReqStep301) {
    return this.botService.step301(req.product, req.category, req.channelId);
  }

  @Post('/step3.1')
  step31(@Body() req: IReqStep301) {
    return this.botService.step31(
      req.product,
      req.category,
      req.channelId,
      req.additional,
      req.additionalCount,
    );
  }
}
