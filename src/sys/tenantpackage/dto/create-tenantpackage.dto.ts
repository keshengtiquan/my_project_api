import { IsNotEmpty } from "class-validator";

export class CreateTenantpackageDto {
  @IsNotEmpty({message: "套餐名称不能为空"})
  package_name: string
}
