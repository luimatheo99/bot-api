import { RestaurantCartsProducts, RestaurantCartsCustomer } from '@prisma/client';
export declare class CreateCartDto {
    customer: RestaurantCartsCustomer;
    products: RestaurantCartsProducts[];
    amount: number;
    idRestaurant: string;
}
