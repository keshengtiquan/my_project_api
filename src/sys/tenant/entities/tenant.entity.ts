import { BaseEntity } from '@/share/baseCrud/BaseEntity';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_tenant')
export class Tenant extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  tenant_id: number;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '联系人' })
  contact_user_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '联系电话' })
  contact_phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: '企业名称' })
  company_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '公司地址',
  })
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: true, comment: '企业简介' })
  intro: string;

  @Column({ type: 'varchar', length: 200, nullable: true, comment: '备注' })
  remark: string

  @Column({type: 'bigint',nullable: true,  comment: "租户套餐编号"})
  package_id: number

  @Column({ type: 'datetime', nullable: true, comment: '过期时间' })
  expire_time: Date

  @Column({ type: "int", nullable: true, default: -1, comment: '创建日期' })
  account_count: number

  @Column({ type: "char", length:1, nullable: true, default: '0', comment: '租户状态（0正常 1停用）' })
  status: string

}
