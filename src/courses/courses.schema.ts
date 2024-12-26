import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'This course has no description' })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: 0 })
  average_rating: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);