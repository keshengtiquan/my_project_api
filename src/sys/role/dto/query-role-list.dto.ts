import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';
import { Transform } from 'class-transformer';
export class QueryRoleListDto extends QueryOptionsDto{

  readonly role_name: string;

  readonly status: string;

  readonly role_key: string;

  @Transform(({ value }) => new Date(value))
  readonly create_date_start?: Date

  @Transform(({ value }) => new Date(value))
  readonly create_date_end?: Date
}  