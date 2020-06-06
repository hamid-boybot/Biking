import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_address: string;
  @Column()
  name: string;
  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  zip_code: number;
  @Column('geometry', {
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: object;
  //'decimal', { precision: 10, scale: 8 }
  //'decimal', { precision: 11, scale: 8 }
  // @Column()
  // lat: number;
  // @Column()
  // lng: number;

  @Column('decimal', { precision: 10, scale: 8 })
  lat: number;
  @Column('decimal', { precision: 11, scale: 8 })
  lng: number;

  
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Offer, offers => offers.address)
  offers: Offer[];

  @ManyToOne(type => User, user => user.addresses)
  user: User;

  }
