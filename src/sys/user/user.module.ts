import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from '@/sys/post/entities/post.entity';
import { Role } from '@/sys/role/entities/role.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
