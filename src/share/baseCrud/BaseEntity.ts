import { Transform, TransformFnParams } from 'class-transformer'
import {  Column, CreateDateColumn, Generated, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity  {

  @Column({ comment: '创建者', default: null })
  create_by: string

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  create_date: string

  @Column({ comment: '更新者', default: null })
  update_by: string

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  update_date: Date
}
