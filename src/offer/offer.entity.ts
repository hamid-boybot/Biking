import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Bike } from '../bike/bike.entity';
import { Transaction } from '../transaction/transaction.entity';
//import { Mandat } from '../mandat/mandat.entity';

export enum OfferType {
  daily = 'daily',
  weekly = 'weekly',
  week_end = 'week_end',
  monthly = 'monthly',
}

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_offer: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: OfferType })
  offer_type: string;

  @Column()
  offer_price: number;

  @Column()
  exchange_availability_start_hour: number;

  @Column()
  exchange_availability_start_minute: number;

  @Column()
  exchange_availability_end_hour: number;

  @Column()
  exchange_availability_end_minute: number;

  @Column({ type: 'numeric', array: true, default: '{1,1,1,1,1,1,1}' })
  offer_availability_weeks: number[];

  @Column({
    type: 'numeric',
    array: true,
    default: '{1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}',
  })
  offer_availability_days: number[];

  @Column({
    type: 'numeric',
    array: true,
    default: '{1,1,1,1,1,1,1,1,1,1,1,1}',
  })
  offer_availability_months;

  @Column({ default: 2020 })
  offer_availability_year: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.offers, { eager: true })
  user: User;

  @ManyToOne(() => Bike, bike => bike.offers, { eager: true })
  bike: Bike;

  // @OneToOne(type => User)
  // @JoinColumn()
  // user: User;

  @OneToMany(() => Transaction, transactions => transactions.offer)
  transactions: Transaction[];
}
