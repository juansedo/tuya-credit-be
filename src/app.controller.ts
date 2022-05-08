import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      products: [
        {
          title: 'Hola',
          description: 'Hola mundo',
          link: 'https://www.google.com',
        },
        {
          title: 'Hola',
          description: 'Hola mundo 2',
          link: 'https://www.google.com',
        },
      ],
    };
  }
}
