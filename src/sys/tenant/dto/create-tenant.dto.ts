import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateTenantDto {

  @IsNotEmpty({message: '联系人不能为空'})
  contact_user_name: string;

  @IsNotEmpty({message: '联系电话不能为空'})
  @Matches(/^1[34578]\d{9}$/, {message: "联系电话格式不正确"})
  contact_phone: string;

  @IsNotEmpty({message: '企业名称不能为空'})
  company_name: string;

  address: string;

  intro: string;

  remark: string;

  @Type(() => Number)
  @IsNotEmpty({message: '租户套餐不能为空'})
  package_id: number;

  @IsDate({message: "过期时间类型不正确"})
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  expire_time: Date;

  @Type(() => Number)
  account_count: number;

  status: string;

}
