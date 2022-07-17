import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

interface IReqCreate {
  channelId: string;
  phoneNumberCustomer: string;
  category: string;
  product: string;
  additional: string;
  observation: string;
}

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('/add')
  create(@Body() req: IReqCreate) {
    console.log(req);
    return this.cartsService.create(
      req.channelId,
      req.phoneNumberCustomer,
      req.product,
      req.additional,
      req.category,
      req.observation,
    );
  }
}
