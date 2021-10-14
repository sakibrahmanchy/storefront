import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Right } from './right.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  dob: string;

  @Column({ nullable: true })
  employer_name: string;

  @Column({ nullable: true })
  address: string;

  @ManyToMany(() => Right, (right) => right.users, {
    cascade: true,
  })
  @JoinTable()
  rights: Right[];

  @Column('boolean', { default: false })
  locked: boolean;
}
