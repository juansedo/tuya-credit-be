import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Product } from '../../modules/product/entities/product.entity';

define(Product, () => {
  const product = new Product();
  const price = Number(faker.commerce.price(100000, 1000000, 0, ''));
  product.ref = faker.random.alphaNumeric(10);
  product.name = faker.commerce.productName();
  product.imageUrl = faker.image.imageUrl();
  product.description = faker.lorem.sentence(5);
  product.originalPrice = price;
  product.creditCardPrice = price * faker.random.arrayElement([0.7, 0.9, 1]);
  product.otherMethodPrice = price;
  product.provider = faker.random.arrayElement(['Grupo Éxito', 'Ktronix', 'Tuya']);
  return product;
});
