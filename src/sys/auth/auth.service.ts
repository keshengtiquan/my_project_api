import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
import { LoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from '@/redis/redis.service';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @Inject(RedisService)
  private readonly redisService: RedisService;

  async login(loginDto: LoginDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        user_name: loginDto.user_name,
      },
      relations: {
        roles: true,
        post: true,
      },
    });

    if (!foundUser || foundUser.password !== loginDto.password) {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }

    let currentUser = {
      user_name: foundUser.user_name,
      nick_name: foundUser.nick_name,
      id: foundUser.id,
      roles: JSON.stringify(foundUser.roles),
      tenant_id: foundUser.tenant_id,
      status: foundUser.status,
      dept_id: foundUser.dept_id,
      user_type: foundUser.user_type,
      post: JSON.stringify(foundUser.post),
    };
    
    try {
      this.redisService.setObject(`currentUser`, currentUser);
    } catch (error) {
      
    }

    return this.token(foundUser);
  }

  private async token({ id, user_id, user_name }) {
    return {
      token: await this.jwt.signAsync({
        sub: user_id,
        user_name,
      }),
    };
  }
}
