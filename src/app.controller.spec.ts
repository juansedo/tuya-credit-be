import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonConfigService } from './config/common/config.service';
import { ProductService } from './modules/product/product.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, CommonConfigService, ConfigService, ProductService],
    }).compile();
    //commonConfigService = app.get<CommonConfigService>(CommonConfigService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World! (Testing watchtower)"', () => {
      expect(appController.getHello()).toBe('Hello World! (Testing watchtower)');
    });
  });
});
