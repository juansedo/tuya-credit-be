import { registerAs } from '@nestjs/config';

export default registerAs('mariadb', () => ({
  connection: process.env.TYPEORM_CONNECTION,
  name: process.env.TYPEORM_DATABASE,
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
}));
