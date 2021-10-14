import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Product } from 'src/entities/product.entity';
import { Sale } from 'src/entities/sale.entity';
import { paginateResponse } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { SaleRequest } from '../requests/sale.request';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Sale)
    private saleRepo: Repository<Sale>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  /**
   * Fetch a sale by given sale id.
   *
   * @param saleId -> number
   * @returns
   */
  async fetchSaleById(saleId: number) {
    if (!saleId) {
      throw new BadRequestException('Sale Id is required');
    }

    return this.saleRepo.findOneOrFail(saleId, {
      relations: ['product', 'product.manufacturer', 'customer'],
    });
  }

  /**
   * Deletes a sale and revert product stock.
   *
   * @param saleId -> number
   * @returns null
   */
  async deleteSaleById(saleId: number) {
    if (!saleId) {
      throw new BadRequestException('Sale Id is required');
    }

    const sale = await this.fetchSaleById(saleId);
    const { product } = sale;

    await this.productRepository.update(product.id, {
      stock: product.stock + 1,
    });

    return this.saleRepo.delete(saleId);
  }

  /**
   * Updates given sale
   *
   * @param saleId -> number
   * @param saleRequest
   * @returns Sale
   */
  async updateSale(saleId: number, saleRequest: SaleRequest) {
    if (!saleId) {
      throw new BadRequestException('Sale Id is required');
    }

    const sale = await this.fetchSaleById(saleId);
    const { product } = sale;

    if (saleRequest.product_id !== product.id) {
      await this.productRepository.update(product.id, {
        stock: product.stock + 1,
      });
    }

    return this.processSale(saleRequest, saleId);
  }

  /**
   * List sales with params
   * @param page -> page number
   * @param perPage -> number of items per page
   * @param order -> custome order: either 'asc' or 'desc'
   * @returns paginatedResponse
   *
   * Protecetd by user auth guard
   */
  async listAll(page = 1, perPage = 5, order = '') {
    const [column = null, ord = null] = order.split(':');
    const result = await this.saleRepo.findAndCount({
      relations: ['product', 'customer', 'product.manufacturer'],
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
   * Create or update a customer based on given sale request
   * primarily email.
   *
   * @param saleRequest -> Given sale request
   * @returns customer
   */
  async saveOrUpdateCustomer(saleRequest: SaleRequest) {
    const { customer_name, customer_email, customer_contact } = saleRequest;

    if (!customer_email) {
      throw new BadRequestException('Customer email is required');
    }

    const customer = await this.customerRepo.findOne({
      customer_email,
    });

    if (!customer) {
      return this.customerRepo.save({
        customer_name,
        customer_email,
        customer_contact,
      });
    } else {
      this.customerRepo.update(customer.id, {
        customer_name,
        customer_email,
        customer_contact,
      });

      return this.customerRepo.findOne(customer.id);
    }
  }

  /**
   * Create a new sale
   *
   * @param saleRequest
   * @returns Sale
   */
  async createSale(saleRequest: SaleRequest) {
    return this.processSale(saleRequest);
  }

  /**
   * Create or update a sale.
   * Calculate product discount and discounted price.
   * Create or update customer based on email.
   * Update stock and product last selling date.
   *
   * @param saleRequest - Given sale request body
   * @param saleId - Applicable if sale is going to be updated
   * @returns new or updated sale
   */
  async processSale(saleRequest: SaleRequest, saleId: null | number = null) {
    const product = await this.productRepository.findOne(
      saleRequest.product_id,
    );

    if (!product) {
      throw new BadRequestException('No products found with the given id.');
    }

    if (product.stock <= 0) {
      throw new BadRequestException('Sorry, this product is out of stock.');
    }

    const discount = (saleRequest.discount_percentage / 100) * product?.price;
    const priceAfterDiscount = product.price - discount;

    const customer = await this.saveOrUpdateCustomer(saleRequest);

    if (!customer) {
      throw new BadRequestException('Customer is required');
    }

    const sale = await this.saleRepo.save({
      id: Number(saleId) || undefined,
      customer,
      discount_percentage: saleRequest.discount_percentage,
      product,
      price: priceAfterDiscount,
    });

    const sellingDate = new Date(sale.created_at).toLocaleDateString();

    await this.productRepository.update(product.id, {
      stock: product.stock - 1,
      last_purchased_on: sellingDate,
    });

    await this.customerRepo.update(customer.id, {
      last_bill_on: sellingDate,
      last_bill_amount: priceAfterDiscount,
    });

    return sale;
  }
}
