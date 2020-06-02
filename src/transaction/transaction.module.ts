import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from '.transaction.repository';
import { UserRepository } from '../user/user.repository';
import { OfferRepository } from '../offer/offer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfferRepository,
      TransactionRepository,
      UserRepository,
    ]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
