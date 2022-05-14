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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dtos/product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import Permission from 'src/common/constants/permission';

@ApiTags('Products')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiResponse({
    status: 200,
    description: 'All products fetched successfully',
  })
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ADMIN)
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ADMIN)
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ADMIN)
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ADMIN)
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
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions(Permission.ADMIN)
  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
    };
  }
}
