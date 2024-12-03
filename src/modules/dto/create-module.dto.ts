import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateModuleDto {
  @IsNotEmpty()
  course_id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  resources?: string[];
}
