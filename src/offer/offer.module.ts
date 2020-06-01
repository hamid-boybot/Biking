import { Module } from '@nestjs/common';
import { OfferService } from './agency.service';
import { OfferController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeRepository } from '../property/property.repository';
import { OfferRepository } from '../agency/agency.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BikeRepository, OfferRepository, UserRepository]),
  ],
  providers: [OfferService],
  controllers: [OfferController],
})
export class AgencyModule {}
