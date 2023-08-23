import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { User } from '@/sys/user/entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty({ message: '用户名称不能为空' })
  nick_name: string;

  @IsNotEmpty({ message: '账号不能为空' })
  user_name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
