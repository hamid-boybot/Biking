import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';
import { Address } from 'src/address/address.entity';

export enum BikeType {
  vtc = 'vélo tout chemin',
  vtt = 'vélo tout terrain',
  city = 'vélo de ville',
  road = 'vélo de route',
  electric = 'vélo à assistance électrique',
  vtt_electric = 'VTT à assistance electrique',
}
export enum BikeState {
  bon = 'bon',
  moyen = 'moyen',
  neuf = 'neuf',
}

export enum BikeSize {
  adulteM = 'Adulte M',
  adulteL = 'Adulte L',
  adulteXL = 'Adulte XL',
  child = 'Enfant',
}

@Entity()
export class Bike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_bike: string;
  @Column()
  name: string;
  @Column('simple-array')
  pictures: string[];
  @Column()
  description: string;
  @Column({ type: 'enum', enum: BikeType })
  bike_type: string;
  @Column({ type: 'enum', enum: BikeState })
  bike_state: string;
  @Column({ nullable: true, type: 'enum', enum: BikeSize })
  bike_size: string;

  @CreateDateColumn()
  created_at: Date;
  @Column({ nullable: true })
  rating: number;

  @ManyToOne(() => User, user => user.bikes)
  user: User;
  @OneToMany(() => Offer, offers => offers.bike)
  offers: Offer[];
  // @ManyToOne(() => Address, address => address.bikes)
  // address: Address;
}
