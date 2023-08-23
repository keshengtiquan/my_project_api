import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { Role } from '@/sys/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sys_menu')
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  menu_id: number;

  @Column({ type: 'varchar', length: 50, comment: '菜单名称' })
  menu_name: string;

  @Column({ type: 'varchar', length: 100, comment: '菜单英文名称' })
  name: string;

  @Column({ type: 'bigint', default: 0, comment: '父菜单ID' })
  parent_id: number;

  @Column({ type: 'varchar', length: 100, comment: '重定向',default: '' })
  redirect: string;

  @Column({ type: 'int', default: 0, comment: '排序' })
  order_num: number;

  @Column({ type: 'varchar', length: 200, default: '', comment: '路由地址' })
  path: string;

  @Column({ type: 'varchar', length: 255, default: '', comment: '组件路径' })
  component: string;

  @Column({ type: 'varchar', length: 255, default: '', comment: '路由参数' })
  query_param: string;

  @Column({ type: 'int', default: 1, comment: '是否为外链（0是 1否）' })
  is_frame: number;

  @Column({ type: 'int', default: 1, comment: '是否缓存（0缓存 1不缓存）' })
  is_cache: number;

  @Column({
    type: 'char',
    length: 1,
    default: '',
    comment: '菜单类型（M目录 C菜单 F按钮）',
  })
  menu_type: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '显示状态（0显示 1隐藏）',
  })
  hidden: boolean;

  @Column({ type: 'boolean', default: true, comment: '面包屑中显示' })
  breadcrumb: boolean;

  @Column({ type: 'boolean', default: false })
  affix: boolean;

  @Column({ type: 'boolean', default: false })
  alwaysShow: boolean;

  @Column({ type: 'varchar', length: 100, default: null })
  activeMenu: string;

  @Column({ type: 'boolean', default: false })
  keepAlive: boolean;

  @Column({
    type: 'char',
    length: 1,
    default: '0',
    comment: '菜单状态（0正常 1停用）',
  })
  status: string;

  @Column({ type: 'varchar', length: 100, default: null, comment: '权限标识' })
  perms: string;

  @Column({ type: 'varchar', length: 100, default: '', comment: '菜单图标' })
  icon: string;

  @Column({ type: 'varchar', length: 500, default: '', comment: '备注' })
  remark: string;

  @JoinTable({
    name: 'sys_role_menu',
    joinColumns: [{ name: 'menu_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  @ManyToMany(() => Role, (roles) => roles.menus)
  roles: Role[];
}
