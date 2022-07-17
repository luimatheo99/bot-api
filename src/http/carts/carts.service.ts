import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(
    channelId: string,
    phoneNumberCustomer: string,
    product: string,
    additional: string,
    category: string,
    observation: string,
  ) {
    const quantityExists = product.toLocaleLowerCase().match('x');
    let item: number;
    let quantity = 1;
    if (!quantityExists) {
      item = Number(product.trim());
    } else {
      item = Number(product.toLocaleLowerCase().split('x')[1].trim());
      quantity = Number(product.toLocaleLowerCase().split('x')[0].trim());
    }

    const additionalArray = additional.split(',');

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { channelId },
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

    let additionalAmount = 0;
    const additionalList = [];
    if (additionalArray[0].toLocaleUpperCase() !== 'OK') {
      for (const additionalItem of additionalArray) {
        const additionalPrice =
          menu.additional[parseInt(additionalItem.trim()) - 1].price;

        const additionalDescription =
          menu.additional[parseInt(additionalItem.trim()) - 1].description;

        additionalList.push({
          description: additionalDescription,
          price: additionalPrice,
        });

        additionalAmount += additionalPrice * quantity;
      }
    }

    if (!cart) {
      const cartNew: CreateCartDto = {
        customer: {
          phoneNumber: phoneNumberCustomer,
        },
        idRestaurant: restaurant.id,
        amount: (menu.price + additionalAmount) * quantity,
        products: [
          {
            name: menu.name,
            amount: menu.price,
            description: menu.description,
            quantity,
            additional: additionalList,
            observation: observation.toUpperCase() === 'OK' ? '' : observation,
          },
        ],
      };
      await this.prisma.restaurantCarts.create({
        data: cartNew,
      });
    } else {
      const cartUpdate: UpdateCartDto = {
        amount: menu.price * quantity + cart.amount + additionalAmount,
        products: [
          ...cart.products,
          {
            name: menu.name,
            amount: menu.price,
            description: menu.description,
            quantity,
            additional: additionalList,
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
