import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateRestaurantCategoryDto } from './dto/create-restaurant-category.dto';
import { UpdateRestaurantCategoryDto } from './dto/update-restaurant-category.dto';

@Injectable()
export class RestaurantCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantCategoryDto: CreateRestaurantCategoryDto) {
    await this.prisma.restaurantCategory.create({
      data: {
        description: createRestaurantCategoryDto.description,
        order: Number(createRestaurantCategoryDto.order),
        idRestaurant: createRestaurantCategoryDto.idRestaurant,
      },
    });
  }

  async findById(idRestaurant: string, id: string) {
    return this.prisma.restaurantCategory.findFirst({
      where: { idRestaurant, id },
    });
  }

  async findAll(idRestaurant: string) {
    return this.prisma.restaurantCategory.findMany({
      where: { idRestaurant },
    });
    //   const categories = await this.prisma.restaurantCategory.findMany({
    //     where: { idRestaurant },
    //   });

    //   let message = '*Escolha 1 categoria*\n';
    //   let index = 0;
    //   for (const category of categories) {
    //     index++;
    //     message += `${index}- ${category.description}\n`;
    //   }

    //   return message;
  }

  async update(
    id: string,
    updateRestaurantCategoryDto: UpdateRestaurantCategoryDto,
  ) {
    const restaurantCategory = await this.prisma.restaurantCategory.findUnique({
      where: { id },
    });

    if (!restaurantCategory) {
      const strErr = 'Categoria não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    await this.prisma.restaurantCategory.update({
      data: {
        description: updateRestaurantCategoryDto.description,
        order: Number(updateRestaurantCategoryDto.order),
        idRestaurant: updateRestaurantCategoryDto.idRestaurant,
      },
      where: {
        id,
      },
    });
  }
}
