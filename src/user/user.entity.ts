import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Bike } from '../bike/bike.entity';
import { Address } from '../address/address.entity';
import { Offer } from '../offer/offer.entity';
import { Transaction } from '../transaction/transaction.entity';

//import { Order } from '../order/order.entity';

export enum UserRole {
  user = 'user',
  admin = 'admin',
}
@Entity()
@Unique(['username', 'mail', 'phone_number'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_user: number;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  sexe: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  country: string;

  @Column()
  phone_number: number;

  @Column()
  mail: string;

  @Column()
  imgUrl: string;

  @Column()
  about: string;

  @Column({ default: false })
  activated: boolean;

  @Column()
  activation_code: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  user_type: string;

  @Column()
  user_checked: boolean;

  @Column()
  credit_card_entered: boolean;

  @Column()
  password_reset_token: string;

  // see also @UpdateDateColumn
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Bike, bikes => bikes.user, { eager: true })
  bikes: Bike[];

  // @OneToMany(() => Order, order => order.user, { eager: true })
  // orders: Order[];

  @OneToMany(() => Address, address => address.user, { eager: true })
  addresses: Address[];

  @OneToMany(() => Offer, offers => offers.user, { onDelete: 'CASCADE' })
  offers: Offer;

  @OneToMany(() => Transaction, transactions => transactions.user, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
