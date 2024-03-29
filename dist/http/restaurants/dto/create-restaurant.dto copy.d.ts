import { CreateUserDto } from 'src/http/users/dto/create-user.dto';
import { Schedules, PaymentTypes, DeliveryFee, TypesDelivery, Menu } from '@prisma/client';
export declare class CreateRestaurantDto {
    name?: string;
    address?: string;
    activeOrder?: boolean;
    user?: CreateUserDto;
    schedules?: Schedules[];
    paymentTypes?: PaymentTypes[];
    deliveryFee?: DeliveryFee;
    typesDelivery?: TypesDelivery[];
    menu?: Menu[];
}
