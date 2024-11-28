import { PartialType } from '@nestjs/mapped-types'; // allows one attribute to be changed if needed
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) { } 
//nothing added since no new field will be added