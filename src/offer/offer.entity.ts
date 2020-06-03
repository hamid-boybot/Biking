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
  perso = 'perso',
}

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_offer: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ type: 'enum', enum: OfferType })
  offer_type: string;

  @Column()
  hour_plage: string;

  @Column()
  price_per_day: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.offers, { eager: true })
  public user: User;

  @ManyToOne(() => Bike, bike => bike.offers, { eager: true })
  bike: Bike;

  // @OneToOne(type => User)
  // @JoinColumn()
  // user: User;

  @OneToMany(() => Transaction, transactions => transactions.offer)
  transactions: Transaction[];
}
