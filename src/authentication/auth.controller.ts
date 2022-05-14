import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { RefreshJwtAuthGuard } from 'src/common/guards/refresh-jwt-auth.guard';
import { LoginUserDto } from 'src/modules/user/dtos/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: 'Access token created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    req.res.setHeader('Authorization', 'Bearer ' + response.access_token);
    return response;
  }

  @ApiOperation({ description: 'Logout' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    await this.authService.removeRefreshToken(req.user.email);
    req.res.setHeader('Authorization', null);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req: any) {
    return await this.authService.createAccessTokenFromRefreshToken(req.user.refreshToken);
  }
}
