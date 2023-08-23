import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantpackageDto } from './create-tenantpackage.dto';

export class UpdateTenantpackageDto extends PartialType(CreateTenantpackageDto) {}
