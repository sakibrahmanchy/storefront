import { IsNotEmpty } from 'class-validator';

export class CreateInventoryRequest {
  @IsNotEmpty()
  distributor_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  units_received: number;

  @IsNotEmpty()
  distributor_price: number;

  @IsNotEmpty()
  delivered_on: string;
}
