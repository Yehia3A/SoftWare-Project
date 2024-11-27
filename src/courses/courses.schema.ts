import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true }) // Automatically manages `createdAt` and `updatedAt`
export class Course {
    @Prop({ required: true })
    title: string; // Course title

    @Prop({ default: 'This course has no description' })
    description: string; // Optional course description with a default value

    @Prop({ required: true })
    category: string; // Course category (e.g., Math, CS)

    @Prop({ required: true })
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; // Difficulty level

    @Prop({ required: true })
    createdBy: string; // ID of the instructor who created the course
}

export const CourseSchema = SchemaFactory.createForClass(Course);
