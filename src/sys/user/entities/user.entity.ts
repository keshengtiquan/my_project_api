import { BaseEntity } from "src/share/baseCrud/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number; 

  @Column({comment: "用户名"})
  username: string;

  @Column({comment: '密码'})
  password: string;

  @Column({comment: "昵称"})
  nick_name: string;

  @Column({comment: "邮箱", nullable: true})
  email: string;

  @Column({comment: '头像', nullable: true})
  avatar: string;

  // 手机号
  @Column({comment: '手机号码', nullable: true})
  phone: string;

  //是否被冻结
  @Column({comment: '是否被冻结', nullable: true, default: () => 0})
  freezed: boolean;
}
