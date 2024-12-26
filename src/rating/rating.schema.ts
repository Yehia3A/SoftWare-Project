import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from '../courses/courses.schema';
import { User } from '../users/user.schema';
import { Modules } from '../modules/modules.schema'; // Correct import

export type RatingDocument = Rating & Document; // Export RatingDocument

@Schema({ timestamps: true })
export class Rating extends Document {
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Modules.name, required: true }) // Correct reference
  module_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  instructor_id: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  type: 'module' | 'course' | 'instructor';
}

export const RatingSchema = SchemaFactory.createForClass(Rating);