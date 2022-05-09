import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  baseUrl: process.env.BACKEND_BASE_URL,
}));
