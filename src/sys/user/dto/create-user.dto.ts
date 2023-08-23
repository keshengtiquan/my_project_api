import {IsNotEmpty} from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty({message: '用户名不能为空'})
  readonly name: string;
  @IsNotEmpty({message: '密码不能为空'})
  readonly password: string;
}
