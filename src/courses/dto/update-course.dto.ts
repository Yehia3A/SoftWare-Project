import { PartialType } from '@nestjs/mapped-types'; // allows one attribute to be changed if needed
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) { 
    @IsNotEmpty()
    updatedAt : Date;
} 