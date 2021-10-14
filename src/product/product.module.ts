import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config';
import { Distributor } from 'src/entities/distributor.entity';
import { InventoryLog } from 'src/entities/inventory-log.entity';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Distributor, InventoryLog]),
    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
