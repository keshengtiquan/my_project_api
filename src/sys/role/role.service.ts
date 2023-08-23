import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DataSource, DeepPartial, Repository, UpdateResult } from 'typeorm';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { QueryRoleListDto } from './dto/query-role-list.dto';
import { User } from '../user/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { Menu } from '../menu/entities/menu.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

type ListResult<T> = {
  total: number;
  pageSize: number;
  pageNumber: number;
  data: T[];
};

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role) roleRepository: Repository<Role>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {
    super(roleRepository);
  }

  async create(createRoleDto: CreateRoleDto, user?: any): Promise<any> {
    const { menuIds, ...otherFields } = createRoleDto;

    if (menuIds && menuIds.length > 0) {
      const menus = await this.menuRepository
        .createQueryBuilder('menu')
        .where('menu_id in (:...menuIds)', { menuIds })
        .getMany();
      otherFields.menus = menus;
    }

    otherFields.tenant_id = user.tenant_id;

    return super.create(otherFields);
  }

  async findAll(
    listDto?: QueryRoleListDto,
    user?: User,
  ): Promise<ListResult<Role>> {
    const { pageNumber = 1, pageSize = 10, ...fields } = listDto;
    const queryBuilder = this.repository
      .createQueryBuilder('r')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ role_sort: 'ASC' });
    

    if (fields.role_name) {
      queryBuilder.where('r.role_name LIKE :role_name', {
        role_name: `%${fields.role_name}%`,
      });
    }
    if (fields.status) {
      queryBuilder.andWhere('r.status = :status', { status: fields.status });
    }
    if (fields.role_key) {
      queryBuilder.andWhere('r.role_key LIKE :role_key', {
        role_key: `%${fields.role_key}%`,
      });
    }
    if (fields.create_date_start && fields.create_date_end) {
      queryBuilder.andWhere('r.create_date >= :create_data_start', {
        create_data_start: fields.create_date_start,
      });
      queryBuilder.andWhere('r.create_date <= :create_data_end', {
        create_data_end: fields.create_date_end,
      });
    }

    queryBuilder.andWhere('r.tenant_id = :tenant_id AND r.del_flag = 0', {
      tenant_id: user.tenant_id,
    });

    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
      pageNumber: +pageNumber,
      pageSize: +pageSize,
    };
  }

  async findOne(role_id: string, field?: string, user?: any): Promise<any> {
    const res = await this.repository.findOne({
      where: {
        role_id: +role_id,
        tenant_id: user.tenant_id,
        del_flag: '0',
      },
      relations: {
        menus: true,
      },
    });
    const menuIds = [];
    res.menus.forEach((item) => {
      if (item.parent_id != 0) {
        menuIds.push(item.menu_id);
      }
    });
    delete res.menus;
    return {
      ...res,
      menuIds,
    };
  }

  async update(data: any, field?: string): Promise<any> {
    const sql = `delete from sys_role_menu where role_id = ${data.role_id}`;

    await this.repository.query(sql);

    if (data.menuIds && data.menuIds.length > 0) {
      let insertSql = `INSERT INTO sys_role_menu (role_id,menu_id) VALUES`;
      data.menuIds.forEach((item, index) => {
        insertSql += `(${data.role_id}, ${item})`;
        if (index < data.menuIds.length - 1) {
          insertSql += ',';
        }
      });
      await this.repository.query(insertSql);
    }
    const { create_by, create_date, update_by, update_date, ...other } = data;

    const res = await this.repository.save(other);

    return res;
  }

  async remove(role_id: number): Promise<any> {
    const res = await this.repository.update(
      { role_id: role_id },
      { del_flag: '1' },
    );
    return true;
  }
}
