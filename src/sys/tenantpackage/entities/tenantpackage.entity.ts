import { BaseEntity } from "@/share/baseCrud/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('sys_tenant_package')
export class Tenantpackage extends BaseEntity{

  @PrimaryGeneratedColumn({type: "bigint", comment: "租户套餐id"})
  package_id: number;

  @Column({type: "varchar", length: 20, comment: "租户套餐名称"})
  package_name: string;

  @Column({type: "varchar", length: 3000, nullable: true, comment: "关联菜单id"})
  menu_ids: string;

  @Column({type: "varchar", length: 200, nullable: true, comment: "备注"})
  remark: string;

  @Column({type: "char", length: 1, comment: "状态（0正常 1停用）", default: '0'})
  status: string;

}
