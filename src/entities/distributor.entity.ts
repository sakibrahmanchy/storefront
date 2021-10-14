import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { InventoryLog } from './inventory-log.entity';
import { Product } from './product.entity';

@Entity()
export class Distributor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  distributor_name: string;

  @Column()
  distributor_address: string;

  @Column()
  contact_person: string;

  @Column()
  contact_number: string;

  @ManyToMany(() => Product, (product: Product) => product.distributors)
  @JoinTable()
  products: Product[];

  @OneToMany(
    () => InventoryLog,
    (InventoryLog: InventoryLog) => InventoryLog.distributor,
  )
  @JoinColumn()
  inventoryLogs: InventoryLog[];
}
