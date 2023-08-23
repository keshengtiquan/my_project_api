import { Injectable } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  DeleteResult,
  UpdateResult,
  FindOperator,
  Equal,
  ILike,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { mapToObj } from '@/utils/map';
import { RedisService } from '@/redis/redis.service';
import { CurrentUser } from '@/decorators/user.decorator';
import { User } from '@/sys/user/entities/user.entity';

type ListResult<T> = {
  total: number;
  pageSize: number;
  pageNumber: number;
  data: T[];
};

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
  ) {}

  async findAll(listDto?, user?): Promise<ListResult<T>> {
    let { pageNumber = 1, pageSize = 10, ...fields } = listDto;
    let queryMap = null;

    if (listDto.queryMap) {
      queryMap = listDto.queryMap;
    } else {
      queryMap = new Map<string, FindOperator<string>>();
      for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
          queryMap.set(key, ILike(`%${fields[key]}%`));
        }
      }
    }

    queryMap.set('del_flag', Equal('0'));

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

  async findOne(id: string, field?: string, user?): Promise<T> {
    const queryBuilder = this.repository.createQueryBuilder('table');
    if (field) {
      queryBuilder.where(`table.${field} = :id`, { id });
    } else {
      queryBuilder.where('table.id = :id', { id });
    }
    if(user){
      queryBuilder.andWhere('table.tenant_id = :tenant_id', {tenant_id: user.tenant_id})
    }
    const res = await queryBuilder.getOne();
    return res;
  }

  async create(data: DeepPartial<T>, user?): Promise<T> {
    const res = await this.repository.save(data);
    return res;
  }

  async update(data: DeepPartial<T>, field?: string): Promise<UpdateResult> {
    const tableName = this.repository.metadata.targetName;

    const queryBuilder = this.repository.createQueryBuilder().update(tableName);
    const { create_date, update_date, create_by, update_by, ...updateData } =
      data;
    if (field) {
      delete updateData[field];
      queryBuilder.set({ ...updateData });
      queryBuilder.where(`${field} = :id`, { id: data[field] });
    } else {
      queryBuilder.set({ ...updateData });
      queryBuilder.where('id = :id', { id: data.id });
    }

    const res = await queryBuilder.execute();
    return res;
  }

  // async remove(id: string, field?: string): Promise<DeleteResult> {
  //   const tableName = this.repository.metadata.targetName;

  //   const queryBuilder = this.repository.createQueryBuilder().delete().from(tableName);

  //   if (field) {
  //     queryBuilder.where(`${field} = :id`, { id });
  //   } else {
  //     queryBuilder.where('id = :id', { id });
  //   }

  //   const res = await queryBuilder.execute();
  //   return res;
  // }

  async remove(deleteDto: any, field?: string): Promise<UpdateResult> {
    const tableName = this.repository.metadata.targetName;

    const queryBuilder = this.repository
      .createQueryBuilder()
      .update(tableName)
      .set({ del_flag: 1 });

    if (field) {
      queryBuilder.where(`${field} = :id`, { id: deleteDto[field] });
    } else {
      queryBuilder.where('id = :id', { ...deleteDto });
    }

    const res = await queryBuilder.execute();
    return res;
  }
}
