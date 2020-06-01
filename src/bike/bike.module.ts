import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeRepository } from './bike.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BikeRepository, UserRepository])],
  providers: [BikeService],
  controllers: [BikeController],
})
export class BikeModule {}
