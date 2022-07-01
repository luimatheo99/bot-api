import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantMenuDto } from './create-restaurant-menu.dto';

export class UpdateRestaurantMenuDto extends PartialType(
  CreateRestaurantMenuDto,
) {}
