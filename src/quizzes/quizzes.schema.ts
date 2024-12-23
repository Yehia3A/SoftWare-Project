import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({ timestamps: true }) // Automatically manages `createdAt` and `updatedAt`
export class Quiz {
  @Prop({ required: true })
  title: string; // Unique identifier for the quiz

  @Prop({ required: true })
  module_id: string; // Associated module ID

  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] }; // Difficulty leve
  
  @Prop({
    type: [
      {
        question_id: { type: String, required: true },
        text: { type: String, required: true }, // Question text
        options: { type: [String], required: true }, // Multiple-choice options
        correctAnswer: { type: String, required: true }, // Correct option
        explanation: { type: String, required: true }, // Explanation for feedback
       
      },
    ],
    required: true,
  })
  questions: Array<{
    question_id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    
  }>;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
