import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/courses.schema'; // Import Course schema
@Schema({ timestamps: true })
export class UserInteraction extends Document {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user_id: Types.ObjectId;
    
    @Prop({ required: true })
    score: Number;

    @Prop({ required: true })
    time_spent_minutes: Number;

    @Prop({ required: true })
    last_accessed: Date;
};

// This is the document type to be used in your service.
export type UserInteractionDocument = UserInteraction & Document;

// Generate the schema using SchemaFactory.
export const UserInteractionSchema = SchemaFactory.createForClass(UserInteraction);
