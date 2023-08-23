import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';
import { Type } from 'class-transformer';
export class QueryUserListDto extends QueryOptionsDto {

  readonly username: string;

  readonly nick_name: string;

  @Type(() => Number)
  readonly id: number;

  readonly email: string;

  readonly phone: string;
  
  @Type(() => Number)
  readonly freezed: number;
}  