import { BaseEntity } from "src/share/baseCrud/BaseEntity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({comment: "父级Id"})
  parentId: number;

  @Column({comment: "菜单标题"})
  title: string;

  @Column({comment: "菜单名称"})
  name: string;

  @Column({comment: "路由地址"})
  path: string;

  @Column({comment: "图标"})
  icon: string;

  @Column({comment: "角色"})
  role: string
}
