import { IsNotEmpty } from "class-validator"

export class LoginDto {

  @IsNotEmpty({message: "账号不能为空"})
  user_name: string

  @IsNotEmpty({message: "密码不能为空"})
  password: string
}