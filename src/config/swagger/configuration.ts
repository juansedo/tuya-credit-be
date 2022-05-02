import { CreditCard } from 'src/modules/card-list/entities/credit-card.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const swaggerConfig = {
  extraModels: [CreditCard, Product, User],
};
