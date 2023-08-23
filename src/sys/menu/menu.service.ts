import { Injectable } from '@nestjs/common';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { handleTree, buildMenuList } from '@/utils/tree';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MenuService extends BaseService<Menu> {
  constructor(@InjectRepository(Menu) menuRepository: Repository<Menu>) {
    super(menuRepository);
  }

  async create(data: DeepPartial<Menu>, user): Promise<Menu> {
    data.create_by = user.nick_name;
    data.update_by = user.nick_name;
    if (!data.parent_id) {
      data.parent_id = 0;
    }
    return super.create(data);
  }

  async findAll(type: string, user: User): Promise<any> {
    const currentRole = user.roles;
    const roles = currentRole.map((item) => {
      return item.role_id;
    });
    const role_keys = currentRole.map((item) => {
      return item.role_key;
    });
    const queryBuilder = this.repository
      .createQueryBuilder('m')
      .select([
        'm.menu_id',
        'm.menu_name',
        'm.path',
        'm.parent_id',
        'm.icon',
        'm.order_num',
        'm.component',
        'm.redirect',
        'm.name',
        'm.hidden',
        'm.affix',
        'm.menu_type',
        'm.breadcrumb',
        'm.activeMenu',
      ]);
    queryBuilder.innerJoin('sys_role_menu', 'rm', 'm.menu_id = rm.menu_id');
    queryBuilder.where('rm.role_id IN (:...roleId)', { roleId: roles });
    const res = await queryBuilder
      .andWhere('m.del_flag = 0')
      .orderBy('m.order_num', 'ASC')
      .getMany();
    const menu = handleTree(res, 'menu_id', 'parent_id');
    if(type){
      return menu;
    }else {
      return buildMenuList(menu);
    }
  }

  async getTree(user: User, field: string) {
    if (!field) {
      field = 'value';
    }

    const currentRole = user.roles;

    const roles = currentRole.map((item) => {
      return item.role_id;
    });
    const role_keys = currentRole.map((item) => {
      return item.role_key;
    });

    // let res = await this.repository
    //   .createQueryBuilder('m')
    //   .select('m.menu_id', field)
    //   .addSelect('m.menu_name', 'title')
    //   .addSelect('m.parent_id', 'parent_id')
    //   .innerJoin('sys_role_menu', 'rm', 'm.menu_id = rm.menu_id')
    //   .where('rm.role_id IN (:...roleId)', { roleId: roles })
    //   .andWhere('m.del_flag = 0')
    //   .orderBy('m.order_num', 'ASC')
    //   .getRawMany();


    const queryBuilder = this.repository
      .createQueryBuilder('m')
      .select('m.menu_id', field)
      .addSelect('m.menu_name', 'label')
      .addSelect('m.parent_id', 'parent_id');

    if (!(user.tenant_id == 0 && role_keys.includes('superAdmin'))) {
      queryBuilder.innerJoin('sys_role_menu', 'rm', 'm.menu_id = rm.menu_id');
      queryBuilder.where('rm.role_id IN (:...roleId)', { roleId: roles });
    }
    const res = await queryBuilder
      .andWhere('m.del_flag = 0')
      .orderBy('m.order_num', 'ASC')
      .getRawMany();

    return handleTree(res, field, 'parent_id');
  }
}
