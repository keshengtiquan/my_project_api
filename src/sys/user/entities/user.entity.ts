import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { Dept } from '@/sys/dept/entities/dept.entity';
import { Post } from '@/sys/post/entities/post.entity';
import { Role } from '@/sys/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sys_user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint', default: 0, comment: '租户编号' })
  tenant_id: number;
  @Column({ type: 'bigint', default: null, comment: '部门ID' })
  dept_id: number;
  @Column({ type: 'varchar', length: 30, nullable: false, comment: '用户账号' })
  user_name: string;
  @Column({ type: 'varchar', length: 30, nullable: false, comment: '用户昵称' })
  nick_name: string;
  @Column({
    type: 'varchar',
    length: 10,
    default: 'sys_user',
    comment: '用户类型（sys_user系统用户）',
  })
  user_type: string;
  @Column({ type: 'varchar', length: 60, default: '', comment: '用户邮箱' })
  email: string;
  @Column({ type: 'varchar', length: 11, default: '', comment: '用户手机号码' })
  phonenumber: string;
  @Column({
    type: 'char',
    length: 1,
    default: '0',
    comment: '用户性别（0男 1女 2未知）',
  })
  gender: string;
  @Column({ type: 'varchar', nullable: true, comment: '头像地址' })
  avatar: string;
  @Column({ type: 'varchar', length: 100, default: '', comment: '密码' })
  password: string;
  @Column({ type: 'char', default: '0', comment: '帐号状态（0正常 1停用）' })
  status: string;
  @Column({ type: 'varchar', length: '500', default: 'null', comment: '备注' })
  remark: string;

  @JoinTable({
    name: 'sys_user_role',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  @ManyToMany(() => Role, (role) => role.user)
  roles: Role[];

  @JoinTable({
    name: 'sys_user_post',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'post_id' }],
  })
  @ManyToMany(() => Post, (post) => post.user)
  post: Post[];
}
