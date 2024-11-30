import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/courses.schema';

export type ModuleDocument = HydratedDocument<Module>;

@Schema({ timestamps: true })
export class Module {
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  resources: string[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
