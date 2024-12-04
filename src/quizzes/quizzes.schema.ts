import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quizzes extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
    moudule_id: Types.ObjectId;

    @Prop({
        type: [{
            _id: { type: Types.ObjectId, auto: true },
            question: String,
            options: [String],
            correctAnswer: String,  // Add correctAnswer field
            explanation: String,    // Add explanation field
        }],
        default: []
    })
    questions: Array<{
        _id: Types.ObjectId;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }>;

    @Prop({ default: Date.now })
    created_at: Date;
}

export type QuizzesDocument = Quizzes & Document;
export const QuizzesSchema = SchemaFactory.createForClass(Quizzes);
