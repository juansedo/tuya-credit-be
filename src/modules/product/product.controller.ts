import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dtos/product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: 'All products fetched successfully',
  })
  @Get('/')
  async findAll() {
    const products = await this.productService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All products fetched successfully',
      data: products,
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Product fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @Post('/')
  async create(@Body() data: ProductDto) {
    const product = await this.productService.create(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductDto) {
    const product = await this.productService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: product,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
