import { Module } from '@nestjs/common';
import { TenantpackageService } from './tenantpackage.service';
import { TenantpackageController } from './tenantpackage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenantpackage } from './entities/tenantpackage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenantpackage])],
  controllers: [TenantpackageController],
  providers: [TenantpackageService]
})
export class TenantpackageModule {}
