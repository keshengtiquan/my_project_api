import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';

export class QueryUserListDto extends QueryOptionsDto {
  // @IsOptional()
  readonly nick_name: string;
  // @IsOptional()
  readonly phonenumber: string;
  // @IsOptional()
  readonly status: string;
}
