import { PartialType } from '@nestjs/swagger';
import { CreditCardDto } from './credit-card.dto';

export class UpdateCreditCardDto extends PartialType(CreditCardDto) {}
