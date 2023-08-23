import { BaseEntity } from "@/share/baseCrud/BaseEntity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projectlist extends BaseEntity {

  @PrimaryColumn({type: 'bigint'})
  pl_id: number; 

  @Column({type: 'varchar', length: 64, default: ''})
  code: string;

  @Column({type: 'varchar', length: 100, comment: '清单名称'})
  project_name: string;

  @Column({type: 'varchar', length: 250, comment: '项目特征'})
  project_characteristics: string;

  @Column({type: 'varchar', length: 20, comment:'单位'})
  unit: string;

  @Column({type: 'double', comment: "工程量"})
  work_quantity: number;

  @Column({type: 'double', comment: "单价"})
  unit_price: number;

  @Column({type: 'double', comment: "合价"})
  total_amount: number;
}
