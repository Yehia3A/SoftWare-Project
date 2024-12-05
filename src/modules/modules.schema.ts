import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/courses.schema';


export type ModulesDocument = HydratedDocument<Modules>;

@Schema({ timestamps: true })
export class Modules {
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  resources: string[]; // Array of URLs to additional resources

  @Prop({ default: Date.now })
  created_at: Date; // Custom creation date if needed (timestamps already handled by mongoose)

}

// Create and export the schema for use
export const ModulesSchema = SchemaFactory.createForClass(Modules);
