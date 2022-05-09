import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonConfigService } from './config/common/config.service';
import { ProductService } from './modules/product/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly commonConfigService: CommonConfigService,
    private readonly productService: ProductService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/qr-generate')
  @Render('index')
  async getProducts() {
    const products = await this.productService.findAll();
    const baseUrl = this.commonConfigService.baseUrl;
    return {
      baseUrl,
      products,
    };
  }
}
