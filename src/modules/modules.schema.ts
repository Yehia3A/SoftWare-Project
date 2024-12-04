import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
<<<<<<< HEAD
import { Document, Types } from 'mongoose';
import { Course } from '../courses/courses.schema'; // Import Course schema

@Schema({ timestamps: true })
export class Module extends Document {
=======
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../courses/courses.schema';


export type ModuleDocument = HydratedDocument<Module>;

@Schema({ timestamps: true })
export class Module {
  @Prop({ type: Types.ObjectId, ref: Course.name, required: true })
  course_id: Types.ObjectId;
>>>>>>> 2390a8ead770db3d57cf8bb675a3eb4376aec2c3

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  resources: string[];

  @Prop({ default: Date.now })
  created_at: Date; // Custom creation date if needed (timestamps already handled by mongoose)

}

// Create and export the schema for use
export const ModuleSchema = SchemaFactory.createForClass(Module);
