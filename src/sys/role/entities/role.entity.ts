import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { Dept } from '@/sys/dept/entities/dept.entity';
import { Menu } from '@/sys/menu/entities/menu.entity';
import { User } from '@/sys/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  role_id: number;

  @Column({type: "bigint",default: 0, comment: "租户编号"})
  tenant_id: number;

  @Column({type: "varchar",length: 30, comment: "角色名称"})
  role_name: string;

  @Column({type: 'varchar', length:100, comment: '角色权限字符串'})
  role_key: string;

  @Column({type: 'int', comment: '显示顺序'})
  role_sort: number;

  @Column({type: "char", default: '1', length: 1, comment: '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）'})
  data_scope: string;

  @Column({type: 'tinyint', default: 1, comment: '菜单树选择项是否关联显示'})
  menu_check_strictly: string;

  @Column({type: 'tinyint', default: 1, comment: '部门树选择项是否关联显示'})
  dept_check_strictly: string;

  @Column({type: "char", default: '0', length: 1, comment: "角色状态（0正常 1停用）"})
  status: string;
  @Column({type: "varchar", length: 500, default: null, comment: "备注"})
  remark: string;

  @JoinTable({
    name: 'sys_user_role',
    joinColumns: [{ name: 'role_id' }], 
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  @ManyToMany(() => User, user => user.roles)
  user: User[]


  @JoinTable({
    name: "sys_role_menu",
    joinColumns: [{ name: 'role_id' }], 
    inverseJoinColumns: [{ name: 'menu_id' }],
  })
  @ManyToMany(() => Menu, menus => menus.roles)
  menus: Menu[]

  @JoinTable({
    name: "sys_role_dept",
    joinColumns: [{ name: 'role_id'}],
    inverseJoinColumns: [{ name: 'dept_id' }],
  })
  @ManyToMany(() => Dept, dept => dept.roles)
  dept: Dept[]
}
