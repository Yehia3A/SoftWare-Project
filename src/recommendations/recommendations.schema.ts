import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Recommendation extends Document {

  @Prop({ required: true, unique: true })
  recommendationId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId,ref:'Course' }], required: true })
  recommendedCourses: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId , ref:'Module'}], default: [] })//aka parts to improve on 
  recommendedModules: string[]; 

  @Prop({ type: [String], default: [] })
  keywords: string[];

}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);
