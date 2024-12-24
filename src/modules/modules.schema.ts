import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ModuleDocument = Modules & Document;

@Schema({ timestamps: true })
export class Modules {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course_id: Types.ObjectId; // Reference to the parent course

  @Prop({ required: true })
  title: string; // Module title

  @Prop({ required: true })
  content: string; // Module content
  @Prop({ required: true })
  resources?: string[];
  @Prop({
    type: [
      {
        text: { type: String, required: true }, // Question text
        difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] }, // Difficulty
        options: {
          type: [String],
          validate: {
            validator: function (v: string[]) {
              return v.length >= 2; // At least 2 options required
            },
            message: 'MCQ questions must have at least 2 options.',
          },
        },
        correctAnswer: { type: String, required: true }, // Correct answer
        explanation: { type: String, required: false }, // Explanation for feedback
      },
    ],
    default: [],
  })
  questionBank: Array<{
    text: string;
    type: string;
    difficulty: string;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

export const ModulesSchema = SchemaFactory.createForClass(Modules);
