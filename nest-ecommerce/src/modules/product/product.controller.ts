import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { User } from '../../utilities/user.decorator';
import { User as UserDocument } from '../../types/user';
import { SellerGuard } from '../../guards/seller.guard';
import { Product } from '../../types/product';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.findAll();
  }

  @Get('/mine')
  @UseGuards(LocalAuthGuard, SellerGuard)
  async listMines(@User() authenticated: UserDocument): Promise<any> {
    const { id } = authenticated;
    return await this.productService.findByOwner(id);
  }

  @Get('/:id')
  async read(@Param('id') id: string) {
    console.log('read thing');
    return await this.productService.findById(id);
  }

  @Get('/seller/:id')
  @UseGuards(LocalAuthGuard, SellerGuard)
  async listBySeller(@Param('id') userId): Promise<Product[]> {
    return await this.productService.findByOwner(userId);
  }

  @Post()
  @UseGuards(LocalAuthGuard, SellerGuard)
  async create(
    @User() authenticated: UserDocument,
    @Body() product: CreateProductDTO,
  ) {
    return await this.productService.create(product, authenticated);
  }

  @Put('/:id')
  @UseGuards(LocalAuthGuard, SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
    @User() authenticated: UserDocument,
  ) {
    const { id: userId } = authenticated;
    return await this.productService.update(id, product, userId);
  }

  @Delete('/:id')
  @UseGuards(LocalAuthGuard, SellerGuard)
  async delete(@Param('id') id: string, @User() authenticated) {
    const { id: userId } = authenticated;

    return await this.productService.delete(id, userId);
  }
}
