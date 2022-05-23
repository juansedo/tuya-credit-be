import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonConfigService {
  constructor(private readonly configService: ConfigService) {}

  get baseUrl(): string {
    return this.configService.get<string>('common.baseUrl');
  }
}
