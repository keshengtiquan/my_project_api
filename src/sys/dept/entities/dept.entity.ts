import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { Role } from '@/sys/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_dept')
export class Dept extends BaseEntity{
  @PrimaryGeneratedColumn({type: 'bigint'})
  dept_id: number;

  @Column({type: 'bigint', comment: '租户编号'})
  tenant_id: number;

  @Column({type: "bigint", comment: "父部门id", default: 0})
  parent_id: number;

  @Column({type: "varchar", length: 500, default: '', comment: "祖级列表"})
  ancestors: string;

  @Column({type: "varchar", length: 30, default: '', comment: "部门名称" })
  dept_name: string;

  @Column({type: "int", comment: "显示顺序", default: 0})
  order_num: number;

  @Column({type: "varchar", length: 20,default: null, comment: "负责人"})
  leader: string;

  @Column({type: "varchar", length: 11, default: null, comment: "联系方式"})
  phone: string;

  @Column({type: "varchar", length:50, default: null, comment: "邮箱"})
  email: string;

  @Column({type: "char", length: 1, default: '0', comment: "部门状态（0正常 1停用）"})
  status: string;

  @JoinTable({
    name: "sys_role_dept",
    joinColumns: [{ name: 'dept_id'}],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  @ManyToMany(() => Role, roles => roles.dept)
  roles: Role[]
}
