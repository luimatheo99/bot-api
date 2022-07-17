import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

interface IReqCreate {
  channelId: string;
  phoneNumberCustomer: string;
  category: string;
  product: string;
  additional: string;
  additionalCount: string;
  observation: string;
}

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('/add')
  create(@Body() req: IReqCreate) {
    return this.cartsService.create(
      req.channelId,
      req.phoneNumberCustomer,
      req.product,
      req.additional,
      req.additionalCount,
      req.category,
      req.observation,
    );
  }
}
