import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreditCardDto {
  @IsString()
  type: string;

  @IsNumberString()
  lastDigits: string;

  @IsNumber()
  fee: number;

  @IsString()
  feeMode: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  available: number;

  @IsNumber()
  interestRate: number;
}
