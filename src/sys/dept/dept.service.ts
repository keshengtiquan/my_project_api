import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dept } from './entities/dept.entity';
import { DeepPartial, DeleteResult, Repository, getConnection } from 'typeorm';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { getParentIds, handleTree } from '@/utils/tree';
import { QueryDeptListDto } from './dto/query-dept-list.dto';
import { RedisService } from '@/redis/redis.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DeptService extends BaseService<Dept> {
  constructor(
    @InjectRepository(Dept) deptRepository: Repository<Dept>
  ) {
    super(deptRepository);
  }

  async create(data: DeepPartial<Dept>,user:User): Promise<Dept> {
    
    const depts = await this.repository.find();
    let parentIds = getParentIds(data.parent_id, 'dept_id', depts);

    data.ancestors = parentIds.toString();
    
    
    data.tenant_id = user.tenant_id;
    data.create_by = user.nick_name;

    return super.create(data);
  }

  async findAll(queryDeptListDto: QueryDeptListDto,user:User): Promise<any> {
    const {dept_name,status} = queryDeptListDto;
    let queryBuilder = this.repository.createQueryBuilder('dept')
    if(dept_name){
      queryBuilder.where('dept.dept_name LIKE :deptName',{deptName: `%${dept_name}%`})
    }
    if(status){
      queryBuilder.andWhere('dept.status = :status', {status})
    }
    
    queryBuilder.andWhere('dept.tenant_id = :tenantId', {tenantId: user.tenant_id})
    queryBuilder.andWhere('dept.del_flag = 0')

    let depts = await queryBuilder.getMany();

    

    return handleTree(depts,'dept_id');
  }

  async remove(dept_id: any, field: string): Promise<any> {
    
    const dept_id_parent = await this.repository
      .createQueryBuilder('d')
      .where('d.parent_id = :dept_id', {dept_id: dept_id.dept_id}).getMany();

    if (dept_id_parent.length > 0) {
      throw new HttpException('存在下级部门不能删除', HttpStatus.BAD_REQUEST);
    }
    
    
    return super.remove(dept_id, field);
  }
  async getSelectTree(user: User){
    let res = await this.repository
      .createQueryBuilder('d')
      .select('d.dept_id', 'value')
      .addSelect('d.dept_name', 'title')
      .addSelect('d.parent_id', 'parent_id')
      .where('d.tenant_id = :tenantId', {tenantId: user.tenant_id})
      .andWhere('d.del_flag = 0')
      .orderBy('d.order_num', 'ASC')
      .getRawMany();

    return handleTree(res, 'value');
  }
}
