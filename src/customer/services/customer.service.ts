import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { paginateResponse } from 'src/utils/paginate';
import { Repository } from 'typeorm';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  /**
   * List customers with params
   * @param page -> page number
   * @param perPage -> number of items per page
   * @param order -> custome order: either 'asc' or 'desc'
   * @returns paginatedResponse
   */
  async listAll(page = 1, perPage = 5, order = '') {
    const [column = null, ord = null] = order.split(':');
    const result = await this.customerRepo.findAndCount({
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
}
