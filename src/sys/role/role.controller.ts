import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleListDto } from './dto/query-role-list.dto';
import { CurrentUser } from '@/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorators';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @Auth()
  create(@Body() createRoleDto: CreateRoleDto, @CurrentUser() user: User) {
    return this.roleService.create(createRoleDto, user);
  }

  @Get('/getlist')
  @Auth()
  findAll(
    @Query() queryRoleListDto: QueryRoleListDto,
    @CurrentUser() user: User,
  ) {
    return this.roleService.findAll(queryRoleListDto, user);
  }

  @Get('/get')
  @Auth()
  findOne(@Query('role_id') role_id: string, @CurrentUser() user: User) {

    return this.roleService.findOne(role_id, 'role_id', user);
  }

  @Post('/update')
  @Auth()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Post('/delete')
  @Auth()
  remove(@Body() params: { role_id: number }) {
    return this.roleService.remove(params.role_id);
  }
}
