import { Injectable } from '@nestjs/common';
import { CreateTenantpackageDto } from './dto/create-tenantpackage.dto';
import { UpdateTenantpackageDto } from './dto/update-tenantpackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenantpackage } from './entities/tenantpackage.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class TenantpackageService extends BaseService<Tenantpackage>{
  constructor(@InjectRepository(Tenantpackage) tenantpackageRepository: Repository<Tenantpackage>){
    super(tenantpackageRepository)
  }
}
