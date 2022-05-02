import { IsEmail, IsOptional, IsString } from 'class-validator';

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
}
