
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateMenuDto {

  @IsNotEmpty({message: '菜单名称不能为空'})
  menu_name: 	string;

  @IsNotEmpty({message: "路由地址不能为空"})
  path: string;

  @IsNotEmpty({message: "展示顺序不能为空"})
  @Type(() => Number)
  order_num: number;

  @IsNotEmpty({message: '路由名称不能为空'})
  name: string

  @Type(() => Number)
  parent_id: number = 0;
}
