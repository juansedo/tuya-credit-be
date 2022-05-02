import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtConfigService } from './config.service';
import configuration from './configuration';
import validation from './validation';
import { enviroments } from 'src/config/enviroments';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validation,
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
