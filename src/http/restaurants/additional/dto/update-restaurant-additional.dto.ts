import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantAdditionalDto } from './create-restaurant-additional.dto';

export class UpdateRestaurantAdditionalDto extends PartialType(
  CreateRestaurantAdditionalDto,
) {}
