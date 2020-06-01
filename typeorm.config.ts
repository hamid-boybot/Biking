import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from './src/user/user.entity';
import { Address } from './src/address/address.entity';
import { Bike } from './src/bike/bike.entity';
import { Offer } from './src/offer/offer.entity';
// import { Order } from './src/order/order.entity';
// import { OrderDetail } from './src/order/orderDetail.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User, Address, Bike, Offer], // mandat
  synchronize: dbConfig.synchronize,
  logging: false,
};
