import { Menu } from "@/sys/menu/entities/menu.entity"
import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class CreateRoleDto {

  role_id?: number

  @IsNotEmpty({message: '角色名称不能为空'})
  role_name: string
  @IsNotEmpty({message: '权限字符描述不能为空'})
  role_key: string
  @Type(() => Number)
  role_sort: number
  tenant_id?: number
  menus?: Menu[]
  menuIds?: string[]
}
