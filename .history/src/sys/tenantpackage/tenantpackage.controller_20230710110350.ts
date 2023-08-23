import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantpackageService } from './tenantpackage.service';
import { CreateTenantpackageDto } from './dto/create-tenantpackage.dto';
import { UpdateTenantpackageDto } from './dto/update-tenantpackage.dto';
import { QueryTenantPackageListDto } from './dto/query-tenantpackage-list.dto';

@Controller('tenantpackage')
export class TenantpackageController {
  constructor(private readonly tenantpackageService: TenantpackageService) {}

  @Post('/create')
  create(@Body() createTenantpackageDto: CreateTenantpackageDto) {
    return this.tenantpackageService.create(createTenantpackageDto);
  }

  @Get('/getlist')
  findAll(@Query() queryTenantPackageListDto:QueryTenantPackageListDto) {
    return this.tenantpackageService.findAll(queryTenantPackageListDto);
  }

  @Get('/get')
  findOne(@Param('id') id: string) {
    return this.tenantpackageService.findOne(id);
  }

  @Post('/update')
  update( @Body() updateTenantpackageDto: UpdateTenantpackageDto) {
    return this.tenantpackageService.update(updateTenantpackageDto);
  }

  @Post('/delete')
  remove(@Query('id') id: string) {
    return this.tenantpackageService.remove(id); 
  }
}
