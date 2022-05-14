import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt/config.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from 'src/modules/user/user.service';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.refreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<JwtPayload> {
    try {
      const refreshToken = req.get('Authorization').split(' ')[1];
      await this.authService.validateRefreshToken(refreshToken);
      return {
        ...payload,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
