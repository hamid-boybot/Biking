import { Repository, EntityRepository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import {
  FilterTransactionDTO,
  TransactionSortType,
} from './dto/filter-transaction.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async findTransaction(filterTransactionDTO: FilterTransactionDTO, user) {
    let {
      search,
      take,
      skip,
      transactionSortType,
      location_amount,
      created_at,
    } = filterTransactionDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('offer');

    if (location_amount) {
      query.andWhere('transaction.location_amount <= :location_amount', {
        location_amount,
      });
    }

    if (search) {
      query.andWhere(
        'transaction.name ILIKE :search OR order.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (created_at) {
      query.andWhere('transaction.created_at <= :created_at ', { created_at });
    }

    if (transactionSortType === TransactionSortType.location_amount) {
      query.orderBy({
        'transaction.location_amount <= :location_amount': 'ASC',
      });
    }
    if (transactionSortType === TransactionSortType.creationDate) {
      query.orderBy({ 'transaction.created_at <= : creationDate': 'ASC' });
    }

    const transactions: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return transactions;
  }

  async getTransaction(id, user): Promise<{}> {
    let findTransaction;

    try {
      const query = await this.createQueryBuilder('transaction').where(
        'transaction.id_transaction=:id',
        { id },
      );

      findTransaction = await query.getOne();
    } catch (error) {
      throw new NotFoundException('not found ');
      //console.log(error);
    }

    return findTransaction;
  }

  async deleteTransaction(id, user): Promise<{}> {
    const findTransaction = await this.findOne({ id_transaction: id });

    if (!findTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    const findUser = await this.findOne({
      id_transaction: id,
      user: user.id_user,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this transaction',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Transaction)
      .where('id_transaction = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateOrder(
    createOrderDto: CreateTransactionDTO,
    user,
    id,
  ): Promise<Transaction> {
    const findOrder = await this.findOne({ id_transaction: id });

    if (!findOrder) {
      throw new NotFoundException('Order not found');
    }

    const findUser = await this.findOne({
      id_transaction: id,
      user: user.id_userr,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this transaction',
      );
    }

    await this.createQueryBuilder()
      .update(Transaction)
      .set({})
      .where({ id_transaction: id })
      .execute();

    return await this.findOne({ id_transaction: id });
  }
}
