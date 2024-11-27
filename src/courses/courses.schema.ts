import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({timestamps: true})
export class Course extends Document{

    @Prop({required: true})
    title: string;

    @Prop({default: 'This course has no description'})
    desc: string;

    @Prop({required: true})
    category: string;

    @Prop({required: true})
    difficulty: string;

    @Prop({required: true})
    createdBy: string;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const CoursesSchema = SchemaFactory.createForClass(Course);