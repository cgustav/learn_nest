import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../types/order';
import { CreateOrderDTO } from './order.dto';
import { Product } from '../../types/product';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listOrdersByUser(userId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ owner: userId })
      .populate('owner')
      .populate('products.product');
    if (!orders)
      throw new HttpException('No orders found', HttpStatus.NO_CONTENT);

    return orders;
  }

  async createOrder(orderDTO: CreateOrderDTO, userId: string) {
    const createOrder = {
      owner: userId,
      products: orderDTO.products,
    };

    const { _id } = await this.orderModel.create(createOrder);
    let order = await this.orderModel
      .findById(_id)
      .populate('products.product');

    const totalPrice = order.products.reduce((previous, product) => {
      const price = (product.product as Product).price * product.quantity;
      return previous + price;
    }, 0);

    await order.update({ totalPrice });

    return await this.orderModel
      .findById(_id)
      .populate('owner')
      .populate('products.product');
  }
}
