import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { User } from '../../utilities/user.decorator';
import { User as UserDocument } from '../../types/user';
import { Order } from '../../types/order';
import { CreateOrderDTO } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  async listOrders(@User() { id }: UserDocument): Promise<Order[]> {
    return await this.orderService.listOrdersByUser(id);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  async createOrder(
    @User() { id }: UserDocument,
    @Body() order: CreateOrderDTO,
  ): Promise<Order> {
    return await this.orderService.createOrder(order, id);
  }
}
