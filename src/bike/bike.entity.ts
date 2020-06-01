import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum BikeType {
  rapide = 'rapide',
  efficace = 'efficace',
  pascher = 'pascher',
}
export enum BikeState {
  bon = 'bon',
  neuf = 'neuf',
  occase = 'occase',
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
  @Column()
  price: number;
  @Column()
  age: number;

  @ManyToOne(() => User, user => user.bikes)
  user: User;
}
