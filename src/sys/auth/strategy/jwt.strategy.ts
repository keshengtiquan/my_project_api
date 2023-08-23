import { User } from '@/sys/user/entities/user.entity';
import { ExecutionContext, Injectable, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      //解析用户提交的bearer token header数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //加密的 secret
      secretOrKey: 'lijianbo',
    });
  }
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async validate({ sub: user_id }, ) {
    let user =  await this.userRepository.findOne({
      where: {
        user_id
      },
      relations: {
        roles: true,
        post: true
      }
    })
    delete user.password;
    return user;
  }
}
