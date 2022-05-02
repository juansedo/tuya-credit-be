import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from 'src/config/swagger/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (!isProd) {
    const config = new DocumentBuilder()
      .setTitle('CrediTuya API')
      .setDescription('CrediTuya API Documentation for managing credit card purchase simulation')
      .addBearerAuth()
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(port);
}
bootstrap();
