import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeRepository } from '../bike/bike.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, BikeRepository])],
  providers: [],
  controllers: [],
})
export class ParticipantModule {}
