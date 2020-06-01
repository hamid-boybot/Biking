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

export enum AgencyType {
  physic = 'physic',
  virtual = 'virtual',
}

@Entity()
export class Agency extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_agency: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  rating: number;

  @Column()
  hour: string;

  @Column({ type: 'enum', enum: AgencyType })
  agency_type: string;

  @CreateDateColumn()
  created_at: Date;

  // @ManyToOne(() => User, user => user.properties)
  // user: User;

  @ManyToMany(() => Property, properties => properties.agencies)
  properties: Property[];

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  // @OneToMany(() => mandat, mandat => mandat.agency)
  // orders: Order[];
}
