import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';

export enum OrderType {
  fruit = 'fruit',
  legume = 'légume',
  alimentaire = 'alimentaire',
  sanitaire = 'sanitaire',
}

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id_order_detail: string;

  @Column()
  product_name: string;
  @Column()
  prix: number;
  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, order => order.ordersdetails)
  order: Order;
}
