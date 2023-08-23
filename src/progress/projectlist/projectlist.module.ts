import { Module } from '@nestjs/common';
import { ProjectlistService } from './projectlist.service';
import { ProjectlistController } from './projectlist.controller';
import { ExcelModule } from '@/excel/excel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projectlist } from './entities/projectlist.entity';

@Module({
  imports: [ExcelModule, TypeOrmModule.forFeature([Projectlist])],
  controllers: [ProjectlistController],
  providers: [ProjectlistService],
})
export class ProjectlistModule {}
