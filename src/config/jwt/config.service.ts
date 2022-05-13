import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get expires(): string {
    return this.configService.get<string>('jwt.expires');
  }

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  get refreshExpires(): string {
    return this.configService.get<string>('jwt.refreshExpires');
  }

  get refreshSecret(): string {
    return this.configService.get<string>('jwt.refreshSecret');
  }
}
