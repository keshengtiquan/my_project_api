import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserListDto } from './dto/query-user-list.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { CurrentUser } from '@/decorators/user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @Auth()
  create(@Body() createUserDto: CreateUserDto, @CurrentUser() user: User) {
    return this.userService.create(createUserDto, user);
  }

  @Get('/getlist')
  @Auth()
  findAll(
    @Query() queryUserListDto: QueryUserListDto,
    @CurrentUser() user: User,
  ) {
    return this.userService.findAll(queryUserListDto, user);
  }

  @Get('/get')
  @Auth()
  findOne(@Query('user_id') user_id: string, @CurrentUser() user: User) {
    return this.userService.findOne(+user_id, user);
  }

  @Post('/update')
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User) {
    return this.userService.update(updateUserDto, user);
  }

  @Post('/delete')
  remove(@Body() deletePar: { user_id: number }) {
    return this.userService.remove(deletePar.user_id);
  }
}
