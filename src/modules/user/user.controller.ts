import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'All users fetched successfully',
  })
  @Get('/')
  async findAll() {
    const users = await this.userService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All users fetched successfully',
      data: users,
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'User document',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.userService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: product,
    };
  }

  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'User document already exists',
  })
  @Post('/')
  async create(@Body() data: UserDto) {
    const user = await this.userService.create(data);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'User document',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    const user = await this.userService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: user,
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'User document',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.userService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'User document',
    type: Number,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User cards fetched successfully (can be empty)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:id/cards')
  async getCards(@Param('id') id: string) {
    const cards = await this.userService.getCards(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User cards fetched successfully',
      data: cards,
    };
  }
}
