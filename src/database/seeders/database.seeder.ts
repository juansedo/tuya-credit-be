import { Factory, Seeder } from 'typeorm-seeding';

import { Product } from '../../modules/product/entities/product.entity';
import { CreditCard } from '../../modules/card-list/entities/credit-card.entity';
import { User } from '../../modules/user/entities/user.entity';

export default class DatabaseSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // Product seeder
    await factory(Product)().createMany(30);

    // User seeder
    User.create({
      name: 'Juan',
      surname: 'Díaz',
      email: 'jsdiazo@eafit.edu.co',
      password: 'jsdiazo',
      document: '100200300',
      userKey: 'ABCD',
    }).save();
    User.create({
      name: 'David',
      surname: 'Calle',
      email: 'dcalleg@eafit.edu.co',
      password: 'dcalleg',
      document: '100200301',
      userKey: 'EFGH',
    }).save();
    User.create({
      name: 'Santiago',
      surname: 'Hidalgo',
      email: 'sanhidalgoo1@eafit.edu.co',
      password: 'sanhidalgoo1',
      document: '100200302',
      userKey: 'IJKL',
    }).save();
    User.create({
      name: 'Julián',
      surname: 'Ríos',
      email: 'jriosv@eafit.edu.co',
      password: 'jriosv',
      document: '100200303',
      userKey: 'OMNP',
    }).save();
    User.create({
      name: 'Hector',
      surname: 'Banilat',
      email: 'hfbanilatq@eafit.edu.co',
      password: 'hfbanilatq',
      document: '100200304',
      userKey: 'QRST',
    }).save();
    User.create({
      name: 'Camilo',
      surname: 'Rojas',
      email: 'jcjimenezr@eafit.edu.co',
      password: 'jcjimenezr',
      document: '100200305',
      userKey: 'UVWX',
    }).save();

    const users = await factory(User)().createMany(10);

    // CreditCard seeder
    let userKeys = users.map((user) => user.userKey);
    userKeys = [...userKeys, 'ABCD', 'EFGH', 'IJKL', 'OMNP', 'QRST', 'UVWX'];

    await factory(CreditCard)()
      .map(async (creditCard) => {
        const random = Math.floor(Math.random() * userKeys.length);
        creditCard.userKey = userKeys[random];
        return creditCard;
      })
      .createMany(40);
  }
}
