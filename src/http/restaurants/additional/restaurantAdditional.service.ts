import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateRestaurantAdditionalDto } from './dto/create-restaurant-additional.dto';
import { UpdateRestaurantAdditionalDto } from './dto/update-restaurant-additional.dto';

@Injectable()
export class RestaurantAdditionalService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantAdditionalDto: CreateRestaurantAdditionalDto) {
    await this.prisma.restaurantAdditional.create({
      data: {
        description: createRestaurantAdditionalDto.description,
        price: Number(createRestaurantAdditionalDto.price),
        idRestaurant: createRestaurantAdditionalDto.idRestaurant,
      },
    });
  }

  async findById(idRestaurant: string, id: string) {
    return this.prisma.restaurantAdditional.findFirst({
      where: { idRestaurant, id },
    });
  }

  async findAll(idRestaurant: string) {
    return this.prisma.restaurantAdditional.findMany({
      where: { idRestaurant },
    });
  }

  async update(
    id: string,
    updateRestaurantAdditionalDto: UpdateRestaurantAdditionalDto,
  ) {
    const restaurantAdditional =
      await this.prisma.restaurantAdditional.findUnique({
        where: { id },
      });

    if (!restaurantAdditional) {
      const strErr = 'Adicional não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    await this.prisma.restaurantAdditional.update({
      data: {
        description: updateRestaurantAdditionalDto.description,
        price: Number(updateRestaurantAdditionalDto.price),
        idRestaurant: updateRestaurantAdditionalDto.idRestaurant,
      },
      where: {
        id,
      },
    });
  }
}
