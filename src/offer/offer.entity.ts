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

  @Column()
  hour_plage: string;

  @Column({ type: 'enum', enum: OfferType })
  agency_type: string;

  @Column()
  price_per_day: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.offers)
  user: User;

  @ManyToOne(() => Bike, bike => bike.offers)
  bike: Bike;

  // @OneToOne(type => User)
  // @JoinColumn()
  // user: User;

  // @OneToMany(() => mandat, mandat => mandat.agency)
  // orders: Order[];
}
