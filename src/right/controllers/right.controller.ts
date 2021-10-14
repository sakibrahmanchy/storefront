import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from 'src/config';
import { UserGuard } from 'src/guards/user.guard';
import { RightService } from '../services/right.service';

export enum SeedQueryType {
  RIGHTS = 'rights',
  ADMIN = 'admin',
  PRODUCT = 'product',
}

@Controller('/rights')
export class RightController {
  constructor(
    private rightService: RightService,
    private configService: ConfigService,
  ) {}

  /**
   * List avialable user rights.
   *
   * @return Right[].
   */
  @Get('/')
  @UseGuards(UserGuard)
  listRights() {
    return this.rightService.getAll();
  }

  /**
   * Seed rights and give admin all rights. Configure
   * appropriate password in env.
   *
   * @return Admin user details.
   */
  @Get('/seed')
  seed(
    @Query('password') password: string,
    @Query('type') type: SeedQueryType,
  ) {
    if (!password || password !== this.configService.get('SEED_PASSWORD')) {
      throw new BadRequestException('Invalid Seed Password');
    }

    if (!type) {
      throw new BadRequestException('A valid type is required');
    }

    switch (type) {
      case SeedQueryType.RIGHTS:
        return this.rightService.seed();

      case SeedQueryType.ADMIN:
        return this.rightService.createAdminAndSeedAllRights();

      default:
        throw new BadRequestException('Invalid type');
    }
  }
}
