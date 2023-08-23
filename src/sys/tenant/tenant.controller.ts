import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { QueryTenantListDto } from './dto/query-tenant-list.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/create')
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get('/getlist')
  findAll(@Query() queryTenantListDto:QueryTenantListDto) {
    return this.tenantService.findAll(queryTenantListDto);
  }

  @Get('/get')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Post('/update')
  update( @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(updateTenantDto);
  }

  @Post('/delete')
  remove(@Query('id') id: string) {
    return this.tenantService.remove(id);
  }
}
