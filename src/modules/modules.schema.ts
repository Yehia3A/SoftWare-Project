import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/courses.schema'; // Reference the Course schema for the relationship

// Define the Module type and document
export type ModuleDocument = HydratedDocument<Module>;

@Schema({ timestamps: true })
export class Module {
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;

  @Prop({ required: true })
  title: string; // Title of the module

  @Prop({ required: true })
  content: string; // Content of the module

  @Prop({ type: [String], default: [] })
  resources: string[]; // Array of URLs to additional resources

  @Prop({ default: Date.now })
  created_at: Date; // Custom creation date if needed (timestamps already handled by mongoose)
}

// Create and export the schema for use
export const ModuleSchema = SchemaFactory.createForClass(Module);
