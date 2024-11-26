import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';
import { Module } from '../modules/modules.schema'; // Import Module schema

@Schema({ timestamps: true })
export class Quizzes extends Document {


    @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
    moudule_id: Types.ObjectId;

    @Prop({ type: [Object], default: [] })
    questions: Array<Object>;

    @Prop({ default: Date.now })
    created_at: Date;
};
export const QuizzesSchema = SchemaFactory.createForClass(Quizzes);
