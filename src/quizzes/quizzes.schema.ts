import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId; // Reference to the related module

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
userId?: Types.ObjectId; // This will be set during "start quiz"


  @Prop({ type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' })
  status: string; // Status of the quiz
  
  @Prop({ type: Number, required: true })
  numberOfQuestions: number; // Number of questions in the quiz

  @Prop({ type: [{ type: Object }], required: true })
  questions: Array<{
    text: string;
    type: string;
    difficulty: string;
    options: string[];
    correctAnswer: string;
  }>; // Selected questions for the quiz
@Prop({ type: Number, required: false })
grade?: number; // The user's grade for the quiz

}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
