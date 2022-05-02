import { Injectable, NotFoundException } from '@nestjs/common';
import { CreditCardDto } from './dtos/credit-card.dto';
import { UpdateCreditCardDto } from './dtos/update-credit-card.dto';
import { CreditCard } from './entities/credit-card.entity';

@Injectable()
export class CardListService {
  async findAll(): Promise<CreditCardDto[]> {
    return CreditCard.find();
  }

  async findOne(id: number): Promise<CreditCardDto> {
    const card = await CreditCard.findOne({ id });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async create(card: CreditCardDto): Promise<CreditCardDto> {
    return CreditCard.create(card).save();
  }

  async update(id: number, card: UpdateCreditCardDto): Promise<CreditCardDto> {
    const data = await CreditCard.findOne({ id });
    if (!data) throw new NotFoundException('Card not updated');
    await CreditCard.update({ id }, card);
    return CreditCard.findOne({ id });
  }

  async destroy(id: number) {
    const data = await CreditCard.findOne({ id });
    if (!data) throw new NotFoundException('Card not deleted');
    await CreditCard.delete({ id });
    return { deleted: true };
  }
}
