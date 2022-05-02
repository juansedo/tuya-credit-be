import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { CreditCardDto } from '../card-list/dtos/credit-card.dto';

@Injectable()
export class UserService {
  async findAll(): Promise<UserDto[]> {
    return User.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await User.findOne({ document: id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(user: UserDto): Promise<UserDto> {
    const data = await User.findOne({ document: user.document });
    if (data) throw new ConflictException('User cannot be created');
    return User.create(user).save();
  }

  async update(id: string, user: UpdateUserDto): Promise<UserDto> {
    const data = await User.findOne({ document: id });
    if (!data) throw new NotFoundException('User not updated');
    await User.update({ document: id }, user);
    return User.findOne({ document: id });
  }

  async destroy(id: string) {
    const data = await User.findOne({ document: id });
    if (!data) throw new NotFoundException('User not deleted');
    await User.delete({ document: id });
    return { deleted: true };
  }

  async getCards(id: string): Promise<CreditCardDto[]> {
    const user = await User.findOne({ document: id });
    if (!user) throw new NotFoundException('User does not exist');
    const cards = await user.getCards();
    return cards;
  }
}
