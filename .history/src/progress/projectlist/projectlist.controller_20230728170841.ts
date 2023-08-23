import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProjectlistService } from './projectlist.service';
import { CreateProjectlistDto } from './dto/create-projectlist.dto';
import { UpdateProjectlistDto } from './dto/update-projectlist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as iconv from 'iconv-lite';
@Controller('projectlist')
export class ProjectlistController {
  constructor(private readonly projectlistService: ProjectlistService) {}

  @Post()
  create(@Body() createProjectlistDto: CreateProjectlistDto) {
    return this.projectlistService.create(createProjectlistDto);
  }

  @Get()
  findAll() {
    return this.projectlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectlistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectlistDto: UpdateProjectlistDto,
  ) {
    return this.projectlistService.update(+id, updateProjectlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectlistService.remove(+id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File){
    return await this.projectlistService.upload(file)
  }


}
