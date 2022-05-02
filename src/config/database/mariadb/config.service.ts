import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MariadbConfigService {
  constructor(private readonly configService: ConfigService) {}

  get connection(): string {
    return this.configService.get<string>('mariadb.connection');
  }

  get name(): string {
    return this.configService.get<string>('mariadb.name');
  }

  get user(): string {
    return this.configService.get<string>('mariadb.user');
  }

  get password(): string {
    return this.configService.get<string>('mariadb.password');
  }

  get host(): string {
    return this.configService.get<string>('mariadb.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('mariadb.port'));
  }
}
