import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeRepository } from './bike.repository';
import { UserRepository } from '../user/user.repository';
import { AddressRepository } from '../address/address.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BikeRepository,
      UserRepository,
      AddressRepository,
    ]),
  ],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
