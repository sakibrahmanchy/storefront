import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  customer_contact: number;

  @Column()
  customer_email: string;

  @Column('datetime', { nullable: true })
  last_bill_on: string;

  @Column('double', { nullable: true })
  last_bill_amount: number;

  @OneToMany(() => Sale, (sale) => sale.customer)
  @JoinColumn()
  sales: Sale[];
}
