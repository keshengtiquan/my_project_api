import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from '@/share/baseCrud/BaseServer';
import { User } from './entities/user.entity';
import { DeepPartial, Equal, FindOperator, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository);
  }
  
  async findAll(listDto: any): Promise<{ total: number; pageSize: number; pageNumber: number; data: User[]; }> {
    let {
      pageNumber=1,
      pageSize=10,
      ...fields
    } = listDto;
    const queryMap = new Map<string, FindOperator<string>>();
    for (const key in fields) { 
      if (fields.hasOwnProperty(key)) {
        queryMap.set(key, ILike(`%${fields[key]}%`));
      }
    }


    return super.findAll(listDto)
  }

}
