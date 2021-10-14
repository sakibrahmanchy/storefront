import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Distributor } from './distributor.entity';
import { Product } from './product.entity';

export enum InventoryLogType {
  RECIEVED = 'received',
  BOUGHT = 'bought',
}

@Entity()
export class InventoryLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.inventoryLogs, {
    cascade: true,
  })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Distributor, (distributor) => distributor.inventoryLogs, {
    cascade: true,
  })
  @JoinColumn()
  distributor: Distributor;

  @Column('int')
  units_received: number;

  @Column('double')
  distributor_price: number;

  @Column('date')
  delivered_on: string;

  @Column({
    type: 'enum',
    enum: InventoryLogType,
    default: InventoryLogType.BOUGHT,
  })
  logType: InventoryLogType;
}
