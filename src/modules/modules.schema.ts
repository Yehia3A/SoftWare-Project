import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt timestamps
export class Module extends Document {
  @Prop({ required: true, unique: true })
  module_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] }) // Optional array of strings
  resources: string[];

  @Prop({ default: Date.now }) // Automatically sets the creation time
  created_at: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);