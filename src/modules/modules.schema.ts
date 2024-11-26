import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from '../courses/courses.schema'; // Import Course schema

@Schema({ timestamps: true })
export class Module extends Document {

  // Reference to Course schema
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  resources: string[];

  @Prop({ default: Date.now })
  created_at: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
