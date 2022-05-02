import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async findAll(): Promise<ProductDto[]> {
    return Product.find();
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await Product.findOne({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(product: ProductDto): Promise<ProductDto> {
    return Product.create(product).save();
  }

  async update(id: number, product: UpdateProductDto): Promise<ProductDto> {
    const data = await Product.findOne({ id });
    if (!data) throw new NotFoundException('Product not updated');
    await Product.update({ id }, product);
    return Product.findOne({ id });
  }

  async destroy(id: number) {
    const data = await Product.findOne({ id });
    if (!data) throw new NotFoundException('Product not deleted');
    await Product.delete({ id });
    return { deleted: true };
  }
}
