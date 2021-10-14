import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Distributor } from 'src/entities/distributor.entity';
import {
  InventoryLog,
  InventoryLogType,
} from 'src/entities/inventory-log.entity';
import { Product } from 'src/entities/product.entity';
import { paginateResponse } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { CreateInventoryRequest } from '../requests/create-inventory.request';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Distributor)
    private distributorRepo: Repository<Distributor>,
    @InjectRepository(InventoryLog)
    private inventoryLogRepo: Repository<InventoryLog>,
  ) {}

  /**
   * List products with params
   * @param page -> page number
   * @param perPage -> number of items per page
   * @param order -> custome order: either 'asc' or 'desc'
   * @returns paginatedResponse
   *
   * Protecetd by user auth guard
   */
  async listAll(page = 1, perPage = 5, order = '') {
    const [column = null, ord = null] = order.split(':');
    const result = await this.productRepository.findAndCount({
      relations: ['manufacturer', 'distributors'],
      take: perPage,
      skip: (page - 1) * perPage,
      ...(column && {
        order: {
          [column]: ord?.toUpperCase(),
        },
      }),
    });
    return paginateResponse(result, page, perPage);
  }

  /**
   * List distributors with products and manufacturers
   * @returns Distributor[]
   */
  async getProductsByDistributors() {
    return this.distributorRepo.find({
      relations: ['products', 'products.manufacturer'],
    });
  }

  /**
   * Fetch Individual Distributor
   * @param distributorId -> number
   * @returns Distributor
   */
  async getDistributorById(distributorId: number) {
    return this.distributorRepo.findOneOrFail(distributorId);
  }

  /**
   * Fetch product by id
   * @param productId -> number
   * @returns Distributor
   */
  async getProductById(productId: number) {
    return this.productRepository.findOneOrFail(productId, {
      relations: ['manufacturer'],
    });
  }

  /**
   * Create an inventory and save it to inventory log. Also updates
   * product stock.
   *
   * @return the stored product.
   */
  async createInventory(createInventoryRequest: CreateInventoryRequest) {
    const [distributor, product] = await Promise.all([
      this.getDistributorById(Number(createInventoryRequest.distributor_id)),
      this.getProductById(Number(createInventoryRequest.product_id)),
    ]);

    await this.inventoryLogRepo.save({
      product,
      distributor,
      logType: InventoryLogType.RECIEVED,
      distributor_price: Number(createInventoryRequest.distributor_price),
      units_received: Number(createInventoryRequest.units_received),
      delivered_on: createInventoryRequest.delivered_on,
    });

    await this.productRepository.update(product.id, {
      stock:
        Number(product.stock) + Number(createInventoryRequest.units_received),
      last_purchased_on: createInventoryRequest.delivered_on,
    });

    return product;
  }
}
