import { CreateCampusDto } from './create-campus-dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCampusDto extends PartialType(CreateCampusDto) {}