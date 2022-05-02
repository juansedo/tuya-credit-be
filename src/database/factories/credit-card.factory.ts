import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { CreditCard } from '../../modules/card-list/entities/credit-card.entity';

define(CreditCard, () => {
  const creditCard = new CreditCard();
  creditCard.lastDigits = String(faker.random.number({ min: 1000, max: 9999 }));
  creditCard.type = faker.random.arrayElement(['MASTERCARD', 'PRIVADA', 'CREDICOMPRAS']);
  creditCard.feeMode = faker.random.arrayElement(['MONTHLY', 'MONTHLY IN USE']);
  creditCard.fee = faker.random.arrayElement([9500, 10500, 12500, 21500]);
  creditCard.capacity = 1000000 * faker.random.float({ min: 1, max: 20, precision: 0.1 });
  creditCard.available = creditCard.capacity * faker.random.float({ min: 0.5, max: 1, precision: 0.1 });
  creditCard.interestRate = faker.random.float({ min: 0.05, max: 2.5, precision: 0.01 });
  return creditCard;
});
