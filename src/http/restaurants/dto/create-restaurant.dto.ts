import { CreateUserDto } from 'src/http/users/dto/create-user.dto';
import {
  Schedules,
  PaymentTypes,
  DeliveryFee,
  TypesDelivery,
} from '@prisma/client';

export class CreateRestaurantDto {
  name?: string;
  address?: string;
  activeOrder?: boolean;
  phoneNumber?: string;
  phoneNumberMessageBird: string;
  user?: CreateUserDto;
  schedules?: Schedules[];
  paymentTypes?: PaymentTypes[];
  deliveryFee?: DeliveryFee;
  typesDelivery?: TypesDelivery[];
}
