import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';
export class QueryTenantPackageListDto extends QueryOptionsDto {
  readonly package_name: string;
}
