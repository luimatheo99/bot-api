import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    await this.prisma.restaurantCarts.create({
      data: createCartDto,
    });
  }
}
