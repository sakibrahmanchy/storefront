import { Column } from 'typeorm';

export class BaseEntity {
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
