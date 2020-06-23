import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId, Types } from 'mongoose';
import { Product } from '../../types/product';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { User } from '../../types/user';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner');
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('owner');
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    else return product;
  }

  async findByOwner(userId: string): Promise<Product[]> {
    const product = await this.productModel
      .find({ owner: userId })
      .populate('owner');
    return product;
  }

  async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
    const product = await this.productModel.create({
      ...productDTO,
      owner: user,
    });
    await product.save();
    return product;
  }

  async update(id: string, productDTO: UpdateProductDTO, userId: string) {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString())
      throw new UnauthorizedException('You dont own this product');
    await product.update(productDTO);
    return await this.productModel.findById(id).populate('owner');
  }

  async delete(id: string, userId: string) {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString())
      throw new UnauthorizedException('You dont own this product');
    await product.remove();
    return product;
  }
}
