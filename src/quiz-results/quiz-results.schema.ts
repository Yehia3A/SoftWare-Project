import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quiz } from '../quizzes/quizzes.schema';
import { User } from '../users/user.schema';

export type QuizResultDocument = QuizResult & Document; // Export QuizResultDocument

@Schema({ timestamps: true })
export class QuizResult extends Document {
  @Prop({ type: Types.ObjectId, ref: Quiz.name, required: true })
  quiz_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  score: number;

  @Prop({ default: Date.now })
  submitted_at: Date;
}

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);