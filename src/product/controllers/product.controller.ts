import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { CreateInventoryRequest } from '../requests/create-inventory.request';
import { ProductService } from '../services/product.service';
@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * List products with params
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
    return this.productService.listAll(Number(page), Number(perPage), order);
  }

  /**
   * List distributors with products and manufacturers
   * @returns Distributor[]
   */
  @UseGuards(UserGuard)
  @Get('/distributors')
  async getDistributors() {
    return this.productService.getProductsByDistributors();
  }

  /**
   * Create an inventory and save it to inventory log. Also updates
   * product stock.
   *
   * @return the stored product.
   */
  @UseGuards(UserGuard)
  @Post('/create-inventory')
  async createInventory(
    @Body() createInventoryRequest: CreateInventoryRequest,
  ) {
    return this.productService.createInventory(createInventoryRequest);
  }
}
