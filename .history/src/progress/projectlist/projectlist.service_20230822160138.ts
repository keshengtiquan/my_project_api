import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProjectlistDto } from './dto/create-projectlist.dto';
import { UpdateProjectlistDto } from './dto/update-projectlist.dto';
import { ExcelService } from '@/excel/excel.service';
import { Repository } from 'typeorm';
import { Projectlist } from './entities/projectlist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectlistService {
  constructor(
    @InjectRepository(Projectlist)
    private projectlistRepository: Repository<Projectlist>,
  ) {}

  @Inject()
  private readonly excelService: ExcelService;

  create(createProjectlistDto: CreateProjectlistDto) {
    return 'This action adds a new projectlist';
  }

  findAll() {
    return `This action returns all projectlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectlist`;
  }

  update(id: number, updateProjectlistDto: UpdateProjectlistDto) {
    return `This action updates a #${id} projectlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectlist`;
  }

  async upload(file) {
    const excelData = await this.excelService.parseExcel(file);
    console.log(excelData);

    const columnHeaders = [
      { A: 'pl_id' },
      { B: 'code' },
      { C: 'project_name' },
      { D: 'project_characteristics' },
      { F: 'unit' },
      { G: 'work_quantity' },
      { H: 'unit_price' },
      { I: 'total_amount' },
    ];
    // const jsonData = this.convertToJSON(excelData, columnHeaders);

    // console.log(jsonData);
    // await this.projectlistRepository.save(jsonData);

    return true;
  }

  convertToJSON(dataArray, columnHeaders) {
    const jsonArray = [];

    // 遍历数组中的每个子数组（除去第一行标题行和最后一行合计行）
    for (let i = 1; i < dataArray.length - 1; i++) {
      const rowData = dataArray[i];

      // 跳过包含全为 null 的行
      if (rowData[0] == null || rowData[0] == '项目编码') {
        continue;
      }

      const jsonObject = {};

      // 遍历每个值并与 columnHeaders 对应的键关联起来
      for (let j = 0; j < rowData.length; j++) {
        const key = columnHeaders[j];
        const value = rowData[j];

        jsonObject[key] = value;
      }

      jsonArray.push(jsonObject);
    }

    return jsonArray;
  }
}
