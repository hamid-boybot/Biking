import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';
import { OfferRepository } from '../offer/offer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Offer,
      User,
      OfferRepository,
      TransactionRepository,
      UserRepository,
    ]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
