import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Forum extends Document {

  @Prop({ required: true })
  name: string;  // Name of the forum

  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  participants: Types.ObjectId[];  // List of users involved in the forum

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  moderators: Types.ObjectId[];  // List of moderators for the forum

  // Threads within the forum (an array of threads)
  @Prop({ type: [{
    title: { type: String, required: true },
    creator: { type: Types.ObjectId, ref: 'User', required: true },
    participants: { type: [Types.ObjectId], ref: 'User', default: [] },
    posts: [{
      content: { type: String, required: true },
      creator: { type: Types.ObjectId, ref: 'User', required: true },
      replies: [{
        content: { type: String, required: true },
        creator: { type: Types.ObjectId, ref: 'User', required: true }
      }]
    }]
  }], default: [] })
  threads: Array<{
    title: string;
    creator: Types.ObjectId;
    participants: Types.ObjectId[];
    posts: Array<{
      content: string;
      creator: Types.ObjectId;
      replies: Array<{
        content: string;
        creator: Types.ObjectId;
      }>;
    }>;
  }>;

}

export const ForumSchema = SchemaFactory.createForClass(Forum);
