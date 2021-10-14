import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { SaleRequest } from '../requests/sale.request';
import { SalesService } from '../services/sales.service';
@Controller('/sales')
export class SalesController {
  constructor(private saleService: SalesService) {}

  /**
   * List sales with params
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
    return this.saleService.listAll(Number(page), Number(perPage), order);
  }

  /**
   * Fetch individual sale
   * @param id -> sale id
   *
   * @returns Sale
   */
  @UseGuards(UserGuard)
  @Get('/:id')
  async fetchSale(@Param('id') id: number) {
    return this.saleService.fetchSaleById(id);
  }

  /**
   * Update individual sale
   * Protecetd by user auth guard
   * @param id -> sale id
   *
   * @returns updated Sale
   */
  @UseGuards(UserGuard)
  @Put('/:id')
  async updateSale(@Param('id') id: number, @Body() saleRequest: SaleRequest) {
    return this.saleService.updateSale(id, saleRequest);
  }

  /**
   * Delete individual sale
   * Protecetd by user auth guard
   * @param id -> sale id
   *
   * @returns null
   */
  @UseGuards(UserGuard)
  @Delete('/:id')
  async deleteSale(@Param('id') id: number) {
    return this.saleService.deleteSaleById(id);
  }

  /**
   * Create new sale accoring to given sale request
   * @body saleRequest
   *
   * @returns null
   */
  @UseGuards(UserGuard)
  @Post('')
  async createSale(@Body() saleRequest: SaleRequest) {
    return this.saleService.createSale(saleRequest);
  }
}
