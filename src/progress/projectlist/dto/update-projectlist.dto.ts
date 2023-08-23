import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectlistDto } from './create-projectlist.dto';

export class UpdateProjectlistDto extends PartialType(CreateProjectlistDto) {}
