import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  expires: process.env.JWT_EXPIRES,
  secret: process.env.JWT_SECRET,
  refreshExpires: process.env.REFRESH_JWT_EXPIRES,
  refreshSecret: process.env.REFRESH_JWT_SECRET,
}));
