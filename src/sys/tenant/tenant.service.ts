import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class TenantService extends BaseService<Tenant> {
  constructor(@InjectRepository(Tenant) tenantRepository: Repository<Tenant>){
    super(tenantRepository)
  }
  
}
