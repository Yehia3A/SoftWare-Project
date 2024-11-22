import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Quizzes extends Document {
    @Prop({ required: true, unique: true })
    quiz_id: String;

    @Prop({ required: true })
    module_id: String;

    @Prop({ type: [Object], default: [] })
    questions: Array<Object>;

    @Prop({ default: Date.now })
    created_at: Date;
};
export const QuizzesSchema = SchemaFactory.createForClass(Quizzes);
