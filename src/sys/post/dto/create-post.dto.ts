import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends Post {
  @MaxLength(64, { message: '岗位编码长度不能超过64' })
  @IsNotEmpty({ message: '岗位编码不能为空' })
  post_code: string;

  @MaxLength(50, { message: '岗位名称长度不能超过50' })
  @IsNotEmpty({ message: '岗位名称不能为空' })
  post_name: string;

  @Type(() => Number)
  @IsNotEmpty({ message: '岗位顺序不能为空' })
  post_sort: number;
}
