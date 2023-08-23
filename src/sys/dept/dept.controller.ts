import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { QueryDeptListDto } from './dto/query-dept-list.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from '@/decorators/user.decorator';

@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post("/create")
  @Auth()
  create(@Body() createDeptDto: CreateDeptDto,@CurrentUser() user: User) {
    return this.deptService.create(createDeptDto,user);
  }

  @Get('/getlist')
  @Auth()
  findAll(@Query() queryDeptListDto:QueryDeptListDto, @CurrentUser() user: User) {

    return this.deptService.findAll(queryDeptListDto,user);
  }

  @Get('/get')
  @Auth()
  findOne(@Query('dept_id') dept_id: string) {
    return this.deptService.findOne(dept_id, 'dept_id');
  }

  @Post('/update')
  @Auth()
  update( @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(updateDeptDto, 'dept_id');
  }

  @Post('/delete')
  @Auth()
  remove(@Body() dept_id: string) {

    return this.deptService.remove(dept_id, 'dept_id');
  }

  @Get('/selectTree')
  @Auth()
  getSelectTree(@CurrentUser() user: User){
    return this.deptService.getSelectTree(user)
  }
}
