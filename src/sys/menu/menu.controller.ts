import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CurrentUser } from '@/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorators';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Auth()
  @Post('/create')
  create(@Body() createMenuDto: CreateMenuDto, @CurrentUser() user: User) {
    return this.menuService.create(createMenuDto, user);
  }

  @Auth()
  @Get('/getlist')
  findAll(@Query('type') type: string, @CurrentUser() user: User) {
    return this.menuService.findAll(type,user);
  }

  @Get('/get')
  findOne(@Query('menu_id') menu_id: string) {
    return this.menuService.findOne(menu_id, 'menu_id');
  }

  @Post('/update')
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto, 'menu_id');
  }

  @Post('/delete')
  remove(@Body() deleteDto: string) {
    return this.menuService.remove(deleteDto, 'menu_id');
  }

  @Auth()
  @Get('/tree')
  getTree(@Query('field') field: string, @CurrentUser() user: User) {
    return this.menuService.getTree(user, field);
  }
}
