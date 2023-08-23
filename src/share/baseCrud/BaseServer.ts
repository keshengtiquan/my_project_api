import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial, DeleteResult, UpdateResult, FindOperator, Equal } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { mapToObj } from '@/utils/map';

type ListResult<T> = {
  total: number,
  pageSize: number,
  pageNumber: number,
  data: T[]
}

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(listDto): Promise<ListResult<T>> {
    let {
      pageNumber=1,
      pageSize=10,
      ...fields
    } = listDto;
    const queryMap = new Map<string, FindOperator<string>>();
    for (const key in fields) { 
      if (fields.hasOwnProperty(key)) {
        queryMap.set(key, Equal(fields[key]));
      }
    }

    const [data, total] = await this.repository
      .createQueryBuilder()
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ id: 'DESC' })
      .printSql()
      .where(mapToObj(queryMap))
      .getManyAndCount();
    return {
      data,
      total,
      pageNumber,
      pageSize,
    };
  }

  async findOne(id: number): Promise<T> {
    const res = await this.repository
      .createQueryBuilder('table')
      .where('table.id = :id', { id })
      .getOne();
    return res;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const res = await this.repository.save(data);
    return res;
  }

  async update(id: number, data: DeepPartial<T>): Promise<UpdateResult> {
    const tableName = this.repository.metadata.targetName;
    const res = await this.repository
      .createQueryBuilder()
      .update(tableName)
      .set({ ...data })
      .where('id = :id', { id: id })
      .execute();

      return res
  }

  async remove(id: number): Promise<DeleteResult> {
    const tableName = this.repository.metadata.targetName;
    const res = await this.repository
      .createQueryBuilder('user')
      .delete()
      .from(tableName)
      .where('id = :id', { id: id })
      .execute();
    return res;
  }
}
