import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as ormconfig from './database';
import { RightModule } from './right/right.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    RightModule,
    ProductModule,
    CustomerModule,
    SalesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
