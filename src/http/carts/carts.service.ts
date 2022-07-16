import { Injectable } from '@nestjs/common';
import { RestaurantCarts } from '@prisma/client';
import { formattedPhoneNumberMessageBird } from 'src/utils/functions/formattedPhoneNumberMessageBird';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(
    phoneNumberMessageBird: string,
    phoneNumberCustomer: string,
    product: string,
    additional: string,
    category: string,
    observation: string,
  ) {
    const phoneNumberMessageBirdFormatted =
      await formattedPhoneNumberMessageBird(phoneNumberMessageBird);

    const quantity = parseInt(product.toLocaleLowerCase().split('x')[0].trim());
    const item = Number(product.toLocaleLowerCase().split('x')[1].trim());

    const restaurant = await this.prisma.restaurant.findFirst({
      where: {
        phoneNumberMessageBird: phoneNumberMessageBirdFormatted,
      },
      select: {
        id: true,
        menu: true,
      },
    });

    const restaurantCategory = await this.prisma.restaurantCategory.findFirst({
      where: {
        idRestaurant: restaurant.id,
        order: Number(category),
      },
    });

    const menusByCategory = [];
    const menus = restaurant.menu;
    for (const menu of menus) {
      if (menu.category === restaurantCategory.description) {
        menusByCategory.push(menu);
      }
    }
    const menu = menusByCategory[item - 1];

    const cart = await this.prisma.restaurantCarts.findFirst({
      where: { customer: { phoneNumber: phoneNumberCustomer } },
    });

    if (!cart) {
      const cartNew: CreateCartDto = {
        customer: {
          phoneNumber: phoneNumberCustomer,
        },
        idRestaurant: restaurant.id,
        amount: menu.price * quantity,
        products: [
          {
            name: menu.name,
            amount: menu.price,
            description: menu.description,
            quantity,
            additional: [],
            observation: observation.toUpperCase() === 'OK' ? '' : observation,
          },
        ],
      };
      await this.prisma.restaurantCarts.create({
        data: cartNew,
      });
    } else {
      const cartUpdate: UpdateCartDto = {
        amount: menu.price * quantity + cart.amount,
        products: [
          ...cart.products,
          {
            name: menu.name,
            amount: menu.price,
            description: menu.description,
            quantity,
            additional: [],
            observation: observation.toUpperCase() === 'OK' ? '' : observation,
          },
        ],
      };
      await this.prisma.restaurantCarts.update({
        where: { id: cart.id },
        data: cartUpdate,
      });
    }
  }
}
