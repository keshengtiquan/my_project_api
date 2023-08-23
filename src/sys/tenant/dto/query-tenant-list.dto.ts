import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';
export class QueryTenantListDto extends QueryOptionsDto {

  readonly tenant_id: string;

  readonly contact_user_name: string;

  readonly contact_phone: string;

  readonly company_name: string;

}  