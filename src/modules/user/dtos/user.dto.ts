import { IsEmail, IsOptional, IsString } from 'class-validator';
import Permission from 'src/common/constants/permission';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  document: string;

  @IsString()
  @IsOptional()
  userKey?: string;

  @IsOptional()
  permissions?: Permission[];

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
