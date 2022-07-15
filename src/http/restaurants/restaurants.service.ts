import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

import { hash } from 'bcryptjs';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from '@prisma/client';
import { CreateRestaurantMenuDto } from './dto/create-restaurant-menu.dto';
import { UpdateRestaurantMenuDto } from './dto/update-restaurant-menu.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.create({
      data: {
        name: createRestaurantDto.name,
        address: createRestaurantDto.address,
        phoneNumber: createRestaurantDto.phoneNumber,
        phoneNumberMessageBird: createRestaurantDto.phoneNumberMessageBird,
      },
    });

    if (!restaurant) {
      const strErr = 'Não foi possível cadastrar o restaurante';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const hashPassword = await hash(createRestaurantDto.user.password, 8);

    await this.prisma.user.create({
      data: {
        name: createRestaurantDto.user.name,
        email: createRestaurantDto.user.email,
        password: hashPassword,
        idRestaurant: restaurant.id,
      },
    });
  }

  async findById(id: string): Promise<Restaurant> {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      const strErr = 'Restaurante não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    await this.prisma.restaurant.update({
      data: {
        name: updateRestaurantDto.name,
        address: updateRestaurantDto.address,
        phoneNumber: updateRestaurantDto.phoneNumber,
        phoneNumberMessageBird: '',
        activeOrder: updateRestaurantDto.activeOrder,
        deliveryFee: updateRestaurantDto.deliveryFee,
        paymentTypes: updateRestaurantDto.paymentTypes,
        schedules: updateRestaurantDto.schedules,
        typesDelivery: updateRestaurantDto.typesDelivery,
      },
      where: {
        id,
      },
    });
  }

  async createMenu(
    id: string,
    createRestaurantMenuDto: CreateRestaurantMenuDto,
  ) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      const strErr = 'Restaurante não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
      where: { description: createRestaurantMenuDto.category },
    });

    if (!restaurantCategory) {
      const strErr = 'Categoria não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (createRestaurantMenuDto.subCategory) {
      const restaurantSubCategory =
        await this.prisma.restaurantSubCategory.findFirst({
          where: { description: createRestaurantMenuDto.subCategory },
        });

      if (!restaurantSubCategory) {
        const strErr = 'SubCategoria não existe!';
        throw new HttpException(strErr, HttpStatus.NOT_FOUND);
      }
    }

    for (const additional of createRestaurantMenuDto.additional) {
      const restaurantAdditional =
        await this.prisma.restaurantAdditional.findFirst({
          where: { description: additional.description },
        });

      if (!restaurantAdditional) {
        const strErr = `Adicional ${additional.description} não existe!`;
        throw new HttpException(strErr, HttpStatus.NOT_FOUND);
      }
    }

    await this.prisma.restaurant.update({
      data: {
        menu: [...restaurant.menu, createRestaurantMenuDto],
      },
      where: {
        id,
      },
    });
  }

  async updateMenu(
    id: string,
    nameMenu: string,
    updateRestaurantMenuDto: UpdateRestaurantMenuDto,
  ) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      const strErr = 'Restaurante não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
      where: { description: updateRestaurantMenuDto.category },
    });

    if (!restaurantCategory) {
      const strErr = 'Categoria não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    if (updateRestaurantMenuDto.subCategory) {
      const restaurantSubCategory =
        await this.prisma.restaurantSubCategory.findFirst({
          where: { description: updateRestaurantMenuDto.subCategory },
        });

      if (!restaurantSubCategory) {
        const strErr = 'SubCategoria não existe!';
        throw new HttpException(strErr, HttpStatus.NOT_FOUND);
      }
    }

    const restaurantMenuIndex = restaurant.menu.findIndex((menu) => {
      return menu.name === nameMenu;
    });

    if (restaurantMenuIndex < 0) {
      const strErr = 'Menu não existe!';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    for (const additional of updateRestaurantMenuDto.additional) {
      const restaurantAdditional =
        await this.prisma.restaurantAdditional.findFirst({
          where: { description: additional.description },
        });

      if (!restaurantAdditional) {
        const strErr = `Adicional ${additional.description} não existe!`;
        throw new HttpException(strErr, HttpStatus.NOT_FOUND);
      }
    }

    restaurant.menu[restaurantMenuIndex].name = updateRestaurantMenuDto.name;
    restaurant.menu[restaurantMenuIndex].price = updateRestaurantMenuDto.price;
    restaurant.menu[restaurantMenuIndex].category =
      updateRestaurantMenuDto.category;
    restaurant.menu[restaurantMenuIndex].description =
      updateRestaurantMenuDto.description;
    restaurant.menu[restaurantMenuIndex].active =
      updateRestaurantMenuDto.active;
    restaurant.menu[restaurantMenuIndex].subCategory =
      updateRestaurantMenuDto.subCategory;
    restaurant.menu[restaurantMenuIndex].additional =
      updateRestaurantMenuDto.additional;

    await this.prisma.restaurant.update({
      data: {
        menu: restaurant.menu,
      },
      where: {
        id,
      },
    });
  }

  async findAllMenu(id: string) {
    const menus = await this.prisma.restaurant.findMany({
      where: {
        id,
      },
      select: {
        menu: true,
      },
    });

    return menus[0].menu;
  }

  async findMenuByName(id: string, nameMenu: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        id,
      },
      select: {
        menu: true,
      },
    });

    return restaurant.menu.find((menu) => menu.name === nameMenu);
  }
}
