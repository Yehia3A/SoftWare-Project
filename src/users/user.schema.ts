import { timestamp } from "rxjs";  
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({timestamps:true})
export class User {
    @Prop({required: true, unique: true})
    user_id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password_hash: string;

    @Prop({required:true, enum: ['student' , 'instructor', 'admin'] })
    role: string;

    @Prop({})
    profilePictureUrl?:string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);