import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MariadbConfigModule } from 'src/config/database/mariadb/config.module';
import { MariadbConfigService } from 'src/config/database/mariadb/config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MariadbConfigModule],
      useFactory: (mariadbConfigService: MariadbConfigService) =>
        Object.assign({
          type: mariadbConfigService.connection,
          host: mariadbConfigService.host,
          port: mariadbConfigService.port,
          username: mariadbConfigService.user,
          password: mariadbConfigService.password,
          database: mariadbConfigService.name,
          synchronize: false,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions),
      inject: [MariadbConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class MariadbDatabaseProviderModule {}
