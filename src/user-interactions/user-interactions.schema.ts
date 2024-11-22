import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/courses.schema'; // Import Course schema

@Schema({ timestamps: true })
export class UserInteraction extends Document {
    @Prop({ required: true, unique: true })
    interaction_id: String;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
    course_id: Types.ObjectId;

    @Prop({ required: true })
    score: Number;

    @Prop({ required: true })
    time_spent_minutes: Number;

    @Prop({ required: true })
    last_accessed: Date;
};
export const UserInteractionSchema = SchemaFactory.createForClass(UserInteraction);
