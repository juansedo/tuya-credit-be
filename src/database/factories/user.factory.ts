import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { User } from '../../modules/user/entities/user.entity';

define(User, () => {
  const user = new User();
  user.name = faker.name.findName();
  user.surname = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = '12345678*';
  user.document = String(faker.unique(faker.random.number, [{ min: 100000000, max: 999999999 }]));
  user.userKey = faker.unique(faker.random.uuid);
  return user;
});
