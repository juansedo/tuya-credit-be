import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import validationConfig from './validation-config';
import config from './config';
import { CardListModule } from './card-list/card-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      validationSchema: validationConfig,
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    CardListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
