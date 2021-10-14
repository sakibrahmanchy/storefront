import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config';
import { Right } from 'src/entities/right.entity';
import { UserModule } from 'src/user/user.module';
import { RightController } from './controllers/right.controller';
import { RightService } from './services/right.service';

@Module({
  imports: [TypeOrmModule.forFeature([Right]), UserModule],
  controllers: [RightController],
  providers: [RightService, ConfigService],
})
export class RightModule {}
