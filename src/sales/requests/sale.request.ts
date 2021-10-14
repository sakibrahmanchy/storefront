import { IsNotEmpty } from 'class-validator';

export class SaleRequest {
  id: number;

  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  customer_contact: number;

  @IsNotEmpty()
  customer_email: string;

  @IsNotEmpty()
  discount_percentage: number;

  @IsNotEmpty()
  product_id: number;
}
