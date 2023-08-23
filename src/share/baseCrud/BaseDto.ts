import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryOptionsDto {
  @Min(1, { message: 'pageSize最小值为1' })
  @IsInt({ message: 'pageSize必须是数字' })
  @Type(() => Number)
  @IsOptional()
  readonly pageSize?: number = 1;

  @Min(1, { message: 'current最小值为1' })
  @IsInt({ message: 'current必须是数字' })
  @Type(() => Number)
  @IsOptional()
  readonly pageNumber?: number = 10;
} 