import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/guards/user.guard';
import { ChangePasswordRequest } from '../requests/change-password.request';
import { LoginRequest } from '../requests/login.request';
import { RegistrationRequest } from '../requests/registration.request';
import { UserUpdateRequest } from '../requests/user-update.request';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * List users with params
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
    return this.userService.listAll(Number(page), Number(perPage), order);
  }

  /**
   * Fetch individual user
   * @param id -> user id
   *
   * @returns User
   */
  @UseGuards(UserGuard)
  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.fetchUserById(id);
  }

  /**
   * Update individual user
   * @param id -> user id
   *
   * @returns User
   */
  @UseGuards(UserGuard)
  @Put('/:id')
  async saveuser(
    @Param('id') id: number,
    @Body() updateUserRequest: UserUpdateRequest,
  ) {
    return this.userService.updateUser({ ...updateUserRequest, id });
  }

  /**
   * Register a new user
   * @param body -> registration request
   *
   * @returns User
   */
  @Post('/')
  async save(@Body() registrationRequest: RegistrationRequest) {
    return this.userService.register(registrationRequest);
  }

  /**
   * Login a user.
   *
   * @body loginRequest
   * @returns UserLoginToken
   */
  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    return this.userService.login(loginRequest);
  }

  /**
   * Changing a user password
   *
   * @body chnagePasswordRequest
   * @returns null
   */
  @UseGuards(UserGuard)
  @Post('/change-password')
  async changePassword(@Body() changePasswordRequest: ChangePasswordRequest) {
    return this.userService.changePassword(changePasswordRequest);
  }
}
