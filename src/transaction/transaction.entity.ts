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
location_amount : number ; 

@Column()
start_date :Date ; 

@Column()
end_date : Date ; 



  @Column()
  state: string;

  
  @Column({default : false})
  renter_confirmation: boolean;

  @Column({default : false})
  owner_confirmation: boolean;

  @Column() 
  feedback : string ; 



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
