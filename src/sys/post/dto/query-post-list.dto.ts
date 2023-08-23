import { QueryOptionsDto } from '@/share/baseCrud/BaseDto';
import { Transform } from 'class-transformer';
export class QueryPostListDto extends QueryOptionsDto {

  post_code: string;

  post_name: string;

  status: string;
}
