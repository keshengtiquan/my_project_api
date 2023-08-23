import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CurrentUser } from '@/decorators/user.decorator';
import { RedisService } from '@/redis/redis.service';
import { QueryUserListDto } from '@/sys/user/dto/query-user-list.dto';
import { filter } from 'rxjs';
import { BusinessException } from '@/filters/business.exception';
import { Post } from '@/sys/post/entities/post.entity';
import { Role } from '@/sys/role/entities/role.entity';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

type ListResult<T> = {
  total: number;
  pageSize: number;
  pageNumber: number;
  data: T[];
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto, user: User): Promise<User> {
    createUserDto.create_by = user.nick_name;
    createUserDto.tenant_id = user.tenant_id;
    const findUser = await this.userRepository.findOne({
      where: {
        user_name: createUserDto.user_name,
        del_flag: '0',
      },
    });
    if (findUser) {
      throw new BusinessException('用户名已存在');
    }
    const res = await this.userRepository.save(createUserDto);

    if (createUserDto.post && createUserDto.post.length > 0) {
      let insertSql = `INSERT INTO sys_user_post (post_id,user_id) VALUES`;
      createUserDto.post.forEach((item, index) => {
        insertSql += `(${item},${res.user_id},)`;
        if (index < createUserDto.post.length - 1) {
          insertSql += ',';
        }
      });
      await this.userRepository.query(insertSql);
    }
    if (createUserDto.roles && createUserDto.roles.length > 0) {
      let insertSql = `INSERT INTO sys_user_role (user_id,role_id) VALUES`;
      createUserDto.roles.forEach((item, index) => {
        insertSql += `(${res.user_id}, ${item})`;
        if (index < createUserDto.roles.length - 1) {
          insertSql += ',';
        }
      });
      await this.userRepository.query(insertSql);
    }

    //TODO 密码加密

    return res;
  }

  async findAll(
    queryListDto: QueryUserListDto,
    user: User,
  ): Promise<ListResult<User>> {
    const { pageNumber = 1, pageSize = 10, ...fields } = queryListDto;
    const queryBuilder = this.userRepository
      .createQueryBuilder('u')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize);
    if (fields.nick_name) {
      queryBuilder.where('u.nick_name LIKE :nick_name', {
        nick_name: `%${fields.nick_name}%`,
      });
    }
    if (fields.phonenumber) {
      queryBuilder.andWhere('u.phonenumber LIKE :phonenumber', {
        phonenumber: `%${fields.phonenumber}%`,
      });
    }
    if (fields.status) {
      queryBuilder.andWhere('u.status = :status', { status: fields.status });
    }
    queryBuilder.andWhere('u.tenant_id = :tenant_id', {
      tenant_id: user.tenant_id,
    });
    queryBuilder.andWhere('u.del_flag = 0');

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total,
    };
  }

  async findOne(user_id: number, user: User) {
    const res = await this.userRepository.findOne({
      where: {
        user_id,
        tenant_id: user.tenant_id,
        del_flag: '0',
      },
      relations: {
        post: true,
        roles: true,
      },
    });
    return res;
  }

  async update(updateUserDto: UpdateUserDto, user: User) {
    const { create_by, create_date, update_date, post, roles, ...otherFields } =
      updateUserDto;
    updateUserDto.update_by = user.nick_name;
    if (updateUserDto.post) {
      //先删除原有的
      const del_sql = `delete from sys_user_post where user_id = ${updateUserDto.user_id}`;
      await this.userRepository.query(del_sql);
      //添加新的
      if (updateUserDto.post.length > 0) {
        let insertSql = `INSERT INTO sys_user_post (post_id,user_id) VALUES`;
        updateUserDto.post.forEach((item, index) => {
          insertSql += `(${item},${updateUserDto.user_id})`;
          if (index < updateUserDto.post.length - 1) {
            insertSql += ',';
          }
        });
        await this.userRepository.query(insertSql);
      }
    }
    if (updateUserDto.roles) {
      const del_sql = `delete from sys_user_role where user_id = ${updateUserDto.user_id}`;
      await this.userRepository.query(del_sql);
      if (updateUserDto.roles.length > 0) {
        let insertSql = `INSERT INTO sys_user_role (user_id,role_id) VALUES`;
        updateUserDto.roles.forEach((item, index) => {
          insertSql += `(${updateUserDto.user_id}, ${item})`;
          if (index < updateUserDto.roles.length - 1) {
            insertSql += ',';
          }
        });
        await this.userRepository.query(insertSql);
      }
    }

    await this.userRepository.save(otherFields);
    return true;
  }

  async remove(user_id: number) {
    const res = await this.userRepository.update(
      { user_id: user_id },
      { del_flag: '1' },
    );
    return true;
  }
}
