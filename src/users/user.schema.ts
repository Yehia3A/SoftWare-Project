import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password_hash: string;

    @Prop({ required: true, enum: ['student', 'instructor', 'admin']})
    role: string;

    @Prop({ required: false })
    profilePictureUrl?: string;

    @Prop({ type: [String], required: false })
    learningPreferences?: string[]; // For students

    @Prop({ type: [String], required: false })
    subjectsOfInterest?: string[]; // For students

    @Prop({ type: [String], required: false })
    expertise?: string[]; // For instructors

    @Prop({ type: [String], required: false })
    teachingInterests?: string[]; // For instructors
}

export const UserSchema = SchemaFactory.createForClass(User);
