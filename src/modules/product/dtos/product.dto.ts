import { IsAlphanumeric, IsNumber, IsString, IsUrl, Matches } from 'class-validator';

export class ProductDto {
  @IsAlphanumeric()
  ref: string;

  @Matches(/^[a-zá-ú0-9-_. ]+$/i)
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  description: string;

  @IsNumber()
  originalPrice: number;

  @IsNumber()
  creditCardPrice: number;

  @IsNumber()
  otherMethodPrice: number;

  @IsString()
  provider: string;
}
