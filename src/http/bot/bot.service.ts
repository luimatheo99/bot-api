import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CartsService } from '../carts/carts.service';

async function formattedPhoneNumberTwillio(phoneNumberTwillio: string) {
  return phoneNumberTwillio.split(':')[1];
}

@Injectable()
export class BotService {
  constructor(
    private prisma: PrismaService,
    private cartsService: CartsService,
  ) {}

  async step1(phoneNumberTwillio: string) {
    const phoneNumberTwillioFormatted = await formattedPhoneNumberTwillio(
      phoneNumberTwillio,
    );

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { phoneNumberTwillio: phoneNumberTwillioFormatted },
    });

    let schedules = '';
    for (const schedule of restaurant.schedules) {
      if (schedule.active) {
        let day = '';

        if (schedule.day === 'sun') {
          day = 'Domingo';
        } else if (schedule.day === 'mon') {
          day = 'Segunda-feira';
        } else if (schedule.day === 'tue') {
          day = 'Terça-feira';
        } else if (schedule.day === 'wed') {
          day = 'Quarta-feira';
        } else if (schedule.day === 'thu') {
          day = 'Quinta-feira';
        } else if (schedule.day === 'fri') {
          day = 'Sexta-feira';
        } else if (schedule.day === 'sat') {
          day = 'Sábado';
        }

        schedules += `  - ${day}: ${schedule.startTime} às ${schedule.endTime}\n`;
      }
    }
    const message = `Olá {nome}\nEste é um canal de *Auto Atendimento*, não há uma pessoa lendo suas mensagens e não visualizamos imagens, vídeos ou áudios. Você deve informar apenas o que lhe for solicitado e sempre aguardar a resposta.\n\n*Informações*\nHorários de atendimentos:\n${schedules}Contato/Dúvidas: ${restaurant.phoneNumber}`;

    return { message };
  }

  async step2(phoneNumberTwillio: string) {
    const phoneNumberTwillioFormatted = await formattedPhoneNumberTwillio(
      phoneNumberTwillio,
    );

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { phoneNumberTwillio: phoneNumberTwillioFormatted },
    });

    const restaurantCategories = await this.prisma.restaurantCategory.findMany({
      where: { idRestaurant: restaurant.id },
      orderBy: [{ order: 'asc' }],
    });

    let categories = '';
    let index = 0;
    let options = '';
    for (const category of restaurantCategories) {
      index++;
      options += index + ',';
      if (category) {
        categories += `*${category.order}*- ${category.description}\n`;
      }
    }
    const message = `Informe uma das opcões ( *apenas o número* )\n\n*MENU*\n\n*Categorias*\n${categories}`;

    return { message, options };
  }

  async step3(category: string, phoneNumberTwillio: string) {
    const phoneNumberTwillioFormatted = await formattedPhoneNumberTwillio(
      phoneNumberTwillio,
    );

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { phoneNumberTwillio: phoneNumberTwillioFormatted },
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

    const menus = restaurant.menu;

    let message =
      '*LANCHES*\n\nInforme a *Quantidade X Opção* que você deseja ( *apenas o número* ). Se for apenas um, informe apenas sua opção.\n\n';
    let menusMessageFormatted = '';
    let index = 0;
    let options = '';
    let additionalCount = 0;
    for (const menu of menus) {
      if (menu.category === restaurantCategory.description) {
        index++;
        options += index + ',';

        menusMessageFormatted += `*${index}*- ${
          menu.name
        } (${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(menu.price))})${
          menu?.description?.length > 0 ? `\n-> ${menu.description}` : ''
        }\n`;

        additionalCount += menu.additional.length > 0 ? 1 : 0;
      }
    }

    message += `${menusMessageFormatted}\nOu envie *#* para voltar`;

    return { message, options, additionalCount };
  }

  async step31(product: number, category: string, phoneNumberTwillio: string) {
    const phoneNumberTwillioFormatted = await formattedPhoneNumberTwillio(
      phoneNumberTwillio,
    );

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { phoneNumberTwillio: phoneNumberTwillioFormatted },
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
    const menu = menusByCategory[product - 1];

    let message = `*${menu.name} - ${new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(menu.price))}${
      menu?.description?.length > 0 ? `\n-> ${menu.description}` : ''
    }*\n\n*Adicionais*\n`;

    let additionalMessageFormatted = '';
    let index = 0;
    for (const additional of menu.additional) {
      index++;
      additionalMessageFormatted += `*${index}*- ${additional.description}`;
    }

    message += `${additionalMessageFormatted}\n\nInforme somente o número dos adicionais que deseja separado por (,) virgula ou envie a palavra *OK* para continuar\n\nOu envie *#* para voltar`;

    return { message };
  }
}
