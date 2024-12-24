import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Recommendation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], required: true })
  recommendedCourses: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Module' }], default: [] })
  recommendedModules: Types.ObjectId[]; // corrected to use Types.ObjectId

  @Prop({ type: [String], default: [] })
  keywords: string[];
}

export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
