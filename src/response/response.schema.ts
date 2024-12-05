import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResponseDocument = HydratedDocument<Response>;

@Schema({ timestamps: true })
export class Response {
  @Prop({ required: true })
  responseId: string; // Unique identifier for the response

  @Prop({ required: true })
  userId: string; // ID of the user who submitted the response

  @Prop({ required: true })
  quizId: string; // ID of the associated quiz

  @Prop({ type: [Object], required: true })
  answers: Array<{ questionId: string; answer: string }>; // User's answers

  @Prop({ required: true })
  score: number; // Score received for the quiz

  @Prop({ default: Date.now })
  submittedAt: Date; // Timestamp of submission
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
