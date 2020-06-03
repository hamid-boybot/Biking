import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';
//import { Mandat } from '../mandat/mandat.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_transaction: string;

  @Column()
  name: string;

  @Column()
  hour_plage: string;

  @Column()
  location_amount: number;

  @Column()
  state: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @ManyToOne(() => Offer, offer => offer.transactions, { eager: true })
  offer: Offer;

  // @OneToOne(type => User)
  // @JoinColumn()
  // user: User;

  // @OneToMany(() => mandat, mandat => mandat.agency)
  // orders: Order[];
}
