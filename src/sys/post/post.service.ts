import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { QueryPostListDto } from './dto/query-post-list.dto';
import { User } from '../user/entities/user.entity';
import { BusinessException } from '@/filters/business.exception';

type ListResult<T> = {
  total: number;
  pageSize: number;
  pageNumber: number;
  data: T[];
};

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: Post, user: User): Promise<Post> {
    createPostDto.create_by = user.nick_name;
    createPostDto.tenant_id = user.tenant_id;
    return this.postRepository.save(createPostDto);
  }

  async findAll(
    queryPostListDto: QueryPostListDto,
    user,
  ): Promise<ListResult<Post>> {


    const { pageNumber = 1, pageSize = 10, ...fields } = queryPostListDto;

    const queryBuilder = this.postRepository
      .createQueryBuilder('p')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize);

    if (fields.post_code) {
      queryBuilder.where('p.post_code = :post_code', {
        post_code: fields.post_code,
      });
    }
    if (fields.post_name) {
      queryBuilder.andWhere('p.post_name LIKE :post_name', {
        post_name: `%${fields.post_name}%`,
      });
    }
    if (fields.status) {
      queryBuilder.andWhere('p.status = :status', { status: fields.status });
    }
    const [data, total] = await queryBuilder
      .andWhere('p.del_flag = 0')
      .andWhere('p.tenant_id = :tenant_id', { tenant_id: user.tenant_id })
      .orderBy('p.post_sort', 'ASC')
      .getManyAndCount();

    return {
      data,
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total,
    };
  }

  async findOne(post_id: number, user: User): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        post_id,
        tenant_id: user.tenant_id,
      },
    });
  }

  async update(update: Post, user: User): Promise<boolean> {
    const { create_by, create_date, update_date, ...otherFields } = update;
    otherFields.update_by = user.nick_name;
    try {
      await this.postRepository.save(otherFields);
      return true;
    } catch (e) {
      throw new BusinessException('更新失败');
    }
  }

  async remove(post_id: string): Promise<boolean> {
    const res = await this.postRepository.update(
      { post_id: +post_id },
      { del_flag: '1' },
    );

    return true;
  }
}
