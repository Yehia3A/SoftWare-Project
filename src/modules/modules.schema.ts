import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/courses.schema'; // Reference the Course schema for the relationship

export type ModuleDocument = HydratedDocument<Module>; // Export the document type for use in services, etc.
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;

  @Prop({ required: true })
  title: string; // Title of the module

  @Prop({ required: true })
  content: string; // Content of the module

  @Prop({ type: [String], default: [] })
  resources: string[]; // Array of URLs to additional resources

  // The `timestamps: true` option already adds `createdAt` and `updatedAt` fields,
  // so this is not needed unless you want a custom date field.
  @Prop({ default: Date.now })
  created_at: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
