import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Forum, ForumSchema } from './forum.schema'; // Import Forum schema
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Forum.name, schema: ForumSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Include User schema if it's in the same module
  ],
  providers: [ForumService],
  controllers: [ForumController],
})
export class ForumModule {}
