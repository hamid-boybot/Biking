import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeRepository } from '../bike/bike.repository';
import { OfferRepository } from '../offer/offer.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BikeRepository, OfferRepository, UserRepository]),
  ],
  providers: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
