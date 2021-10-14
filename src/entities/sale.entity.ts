import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  discount_percentage: number;

  @Column('double')
  price: number;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn()
  product: Product;
}
