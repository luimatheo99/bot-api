import {
  RestaurantCartsProducts,
  RestaurantCartsCustomer,
} from '@prisma/client';

export class CreateCartDto {
  customer: RestaurantCartsCustomer;
  products: RestaurantCartsProducts[];
  amount: number;
  idRestaurant: string;
}
