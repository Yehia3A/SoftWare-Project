import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Forum } from './forum.schema';
import { CreateForumDto } from './dto/create.forum.dto';
import { AddThreadDto } from './dto/add.thread.dto';
import { AddPostDto } from './dto/add.post.dto';
import { AddReplyDto } from './dto/add.reply.dto';

@Injectable()
export class ForumService {
  constructor(@InjectModel(Forum.name) private readonly forumModel: Model<Forum>) {}

  // Create a new forum
  async createForum(createForumDto: CreateForumDto): Promise<Forum> {
    const { name, participants, moderators } = createForumDto;

    const forum = new this.forumModel({
      name,
      participants: participants.map((id) => new Types.ObjectId(id)),
      moderators: moderators.map((id) => new Types.ObjectId(id)),
    });

    return await forum.save();
  }

  // Retrieve a forum by its ID
  async getForumById(id: string): Promise<Forum> {
    const forum = await this.forumModel
      .findById(id)
      .populate('participants moderators threads.posts.creator threads.posts.replies.creator');
    if (!forum) {
      throw new NotFoundException('Forum not found');
    }
    return forum;
  }

  // Add a new thread to a forum
  async addThread(id: string, addThreadDto: AddThreadDto): Promise<Forum> {
    const { title, creator } = addThreadDto;

    const forum = await this.getForumById(id);
    forum.threads.push({
      title,
      creator: new Types.ObjectId(creator),
      participants: [],
      posts: [],
    });

    return await forum.save();
  }

  // Add a new post to a thread
  async addPost(forumId: string, threadIndex: number, addPostDto: AddPostDto): Promise<Forum> {
    const { content, creator } = addPostDto;

    const forum = await this.getForumById(forumId);
    if (!forum.threads[threadIndex]) {
      throw new NotFoundException('Thread not found');
    }

    forum.threads[threadIndex].posts.push({
      content,
      creator: new Types.ObjectId(creator),
      replies: [],
    });

    return await forum.save();
  }

  // Add a reply to a post
  async addReply(
    forumId: string,
    threadIndex: number,
    postIndex: number,
    addReplyDto: AddReplyDto,
  ): Promise<Forum> {
    const { content, creator } = addReplyDto;

    const forum = await this.getForumById(forumId);
    if (!forum.threads[threadIndex] || !forum.threads[threadIndex].posts[postIndex]) {
      throw new NotFoundException('Post not found');
    }

    forum.threads[threadIndex].posts[postIndex].replies.push({
      content,
      creator: new Types.ObjectId(creator),
    });

    return await forum.save();
  }

  // Delete a forum
  async deleteForum(id: string): Promise<Forum> {
    const forum = await this.forumModel.findByIdAndDelete(id);
    if (!forum) {
      throw new NotFoundException('Forum not found');
    }
    return forum;
  }
}
