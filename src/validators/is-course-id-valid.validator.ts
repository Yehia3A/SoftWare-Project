import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../courses/courses.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCourseIdValidConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async validate(courseId: string, args: ValidationArguments): Promise<boolean> {
    const course = await this.courseModel.findById(courseId).exec();
    return !!course; // Returns true if the course exists
  }

  defaultMessage(args: ValidationArguments): string {
    return `Course with ID "${args.value}" does not exist.`;
  }
}
