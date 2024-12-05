
import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateModuleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[];
}
export class UpdateModuleDto extends PartialType(CreateModuleDto) { }

