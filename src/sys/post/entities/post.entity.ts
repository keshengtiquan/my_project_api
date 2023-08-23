import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { User } from '@/sys/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sys_post')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  post_id: number;

  @Column({ type: 'bigint', default: '0', comment: '租户编号' })
  tenant_id: number;

  @Column({ type: 'varchar', length: 64, comment: '岗位编码' })
  post_code: string;

  @Column({ type: 'varchar', length: 50, comment: '岗位名称' })
  post_name: string;

  @Column({ type: 'int', comment: '显示顺序' })
  post_sort: number;

  @Column({
    type: 'char',
    length: 1,
    default: '0',
    comment: '状态（0正常 1停用）',
  })
  status: string;

  @Column({ type: 'varchar', length: 500, default: null, comment: '备注' })
  remark: string;

  @JoinTable({
    name: 'sys_user_post',
    joinColumns: [{ name: 'post_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  @ManyToMany(() => User, (user) => user.post)
  user: User[];
}
