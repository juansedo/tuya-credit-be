import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { User } from 'src/modules/user/entities/user.entity';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private jwtConfigService: JwtConfigService,
  ) {}

  /**
   * Method for LocalStrategy
   */
  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  /**
   * Method for RefreshJwtStrategy
   */
  async validateRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as JwtPayload;
      if (!decoded) throw new Error();

      const user = await this.userService.findOneByEmail(decoded.email);
      if (!user) throw new NotFoundException('User with this id does not exist');

      const hasher = createHmac('sha256', process.env.REFRESH_JWT_SECRET);
      const key = hasher.update(refreshToken).digest('hex');
      const isTokenMatching = await bcrypt.compare(key, user.refreshToken);
      if (!isTokenMatching) throw new UnauthorizedException('Invalid token');
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfigService.secret,
        expiresIn: this.jwtConfigService.expires,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfigService.refreshSecret,
        expiresIn: this.jwtConfigService.refreshExpires,
      }),
    ]);
    await this.setCurrentRefreshToken(refreshToken, user.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const user = await User.findOne({ id: userId });
    await user.setRefreshTokenHash(refreshToken);
    return user.save();
  }

  async createAccessTokenFromRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken) as JwtPayload;
    const user = (await this.userService.findOneByEmail(decoded.email)) as User;

    const payload = { email: user.email, sub: user.id };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.jwtConfigService.secret,
        expiresIn: this.jwtConfigService.expires,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async removeRefreshToken(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User with this id does not exist');

    return User.update({ email: user.email }, { refreshToken: null });
  }
}
