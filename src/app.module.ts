import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MariadbDatabaseProviderModule } from './providers/database/mariadb/provider.module';
import { CardListModule } from './modules/card-list/card-list.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MariadbDatabaseProviderModule,
    CardListModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
