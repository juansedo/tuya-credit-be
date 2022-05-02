import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardListController } from './card-list.controller';
import { CardListService } from './card-list.service';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CardListController],
  providers: [CardListService],
})
export class CardListModule {}
