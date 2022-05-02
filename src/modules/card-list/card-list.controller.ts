import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardListService } from './card-list.service';
import { CreditCardDto } from './dtos/credit-card.dto';
import { UpdateCreditCardDto } from './dtos/update-credit-card.dto';

@ApiTags('Card List')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('card-list')
export class CardListController {
  constructor(private cardListService: CardListService) {}

  @Get('/')
  async findAll() {
    const cards = await this.cardListService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All cards fetched successfully',
      data: cards,
    };
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const card = await this.cardListService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Card fetched successfully',
      data: card,
    };
  }

  @Post('/')
  async create(@Body() data: CreditCardDto) {
    const card = await this.cardListService.create(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Card created successfully',
      data: card,
    };
  }

  @Put('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCreditCardDto) {
    const card = await this.cardListService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Card updated successfully',
      data: card,
    };
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.cardListService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Card deleted successfully',
    };
  }
}
