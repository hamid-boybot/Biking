import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

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
  @Column('decimal', { precision: 10, scale: 8 })
  lat: number;
  @Column('decimal', { precision: 11, scale: 8 })
  lng: number;
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(
    type => User,
    user => user.addresses,
  )
  user: User;
}
