import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Distributor } from './distributor.entity';
import { InventoryLog } from './inventory-log.entity';
import { Manufacturer } from './manufacturer.entity';
import { Sale } from './sale.entity';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  @JoinColumn()
  manufacturer: Manufacturer;

  @Column('int')
  stock: number;

  @Column('double')
  price: number;

  @Column('timestamp', { nullable: true })
  last_purchased_on: string;

  @OneToMany(() => Sale, (sale) => sale.product, {
    cascade: true,
  })
  @JoinColumn()
  sales: Sale[];

  @ManyToMany(
    () => Distributor,
    (distributor: Distributor) => distributor.products,
    {
      cascade: true,
    },
  )
  @JoinTable()
  distributors: Distributor[];

  @OneToMany(
    () => InventoryLog,
    (InventoryLog: InventoryLog) => InventoryLog.distributor,
  )
  @JoinColumn()
  inventoryLogs: InventoryLog[];
}
