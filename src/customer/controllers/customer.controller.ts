import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { CustomerService } from '../services/customer.service';
@Controller('/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  /**
   * List customers with params
   * @param page -> page number
   * @param perPage -> number of items per page
   * @param order -> custome order: either 'asc' or 'desc'
   * @returns paginatedResponse
   *
   * Protecetd by user auth guard
   */
  @UseGuards(UserGuard)
  @Get('/')
  async list(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('order') order: string,
  ) {
    return this.customerService.listAll(Number(page), Number(perPage), order);
  }
}
