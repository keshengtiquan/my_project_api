import { Transform, TransformFnParams } from 'class-transformer'
import {  Column, CreateDateColumn, Generated, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity  {
  @Column()
  @Generated('uuid')
  id: string;

  @Column({type: 'char', length:1, default: '0', comment: "删除标志（0代表存在 1代表删除）"})
  del_flag: string

  @Column({ comment: '创建者', default: null })
  create_by: string

 
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  create_date: string

  @Column({ comment: '更新者', default: null })
  update_by: string

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  update_date: Date
}
