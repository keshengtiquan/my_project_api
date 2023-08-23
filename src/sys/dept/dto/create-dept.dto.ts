import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateDeptDto {

  @Type(() => Number)
  @IsNotEmpty({message: "上级部门不能为空"})
  parent_id: number

  @IsNotEmpty({message: "部门名称不能为空"})
  dept_name: string

  @Type(() => Number)
  @IsNotEmpty({message: "显示排序不能为空"})
  order_num: number
}
