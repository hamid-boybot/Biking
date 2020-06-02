import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiProperty,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { FilterTransactionDTO } from './dto/filter-transaction.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/offer-transactions/:id')
  @UseGuards(AuthGuard('jwt')) // protection de la route par authentification json web token
  @ApiParam({ name: 'id' }) // pour swagger
  // pour nestJs =>
  async getTransactions(@Param('id') id_offer, @getUser() user) {
    return await this.transactionService.getTransactions(id_offer, user);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description:
      'return the transactions corresponding to the search parameters',
  })
  async findTransaction(
    @Query() filterTransactionDTO: FilterTransactionDTO,
    @getUser() user,
  ) {
    return await this.transactionService.findTransaction(
      filterTransactionDTO,
      user,
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async getTransaction(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.transactionService.getTransaction(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateTransaction(
    @Body() createTransactionDto: CreateTransactionDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Transaction> {
    return await this.transactionService.updateTransaction(
      createTransactionDto,
      user,
      id,
    );
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  //@UseGuards(AuthGuard('jwt'))
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDTO,
    @getUser() user,
  ): Promise<Transaction> {
    return await this.transactionService.createTransaction(
      createTransactionDto,
      user,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteTransaction(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.transactionService.deleteTransaction(id, user);
  }
}
