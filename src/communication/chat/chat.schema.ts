import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {

  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false }) 
  receiver: Types.ObjectId [];

  @Prop({ type: [{
    sender: { type: Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    attachments: { type: [String], default: [] },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  }], default: [] })
  messages: { 
    sender: Types.ObjectId;
    message: string;
    attachments: string[];
    timestamp: Date;
    isRead: boolean;
  }[];

  @Prop({ type: String, enum: ['direct', 'group'], default: 'direct' })
  chatType: 'direct' | 'group';

}

export const ChatSchema = SchemaFactory.createForClass(Chat);