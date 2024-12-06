import { Body, Controller, Post, Param, Put } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create.forum.dto';
import { AddThreadDto } from './dto/add.thread.dto';
import { AddPostDto } from './dto/add.post.dto';
import { AddReplyDto } from './dto/add.reply.dto';
import { Types } from 'mongoose';  // Add this import


@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async createForum(@Body() createForumDto: CreateForumDto) {
    // Pass the converted arrays to the service
    return await this.forumService.createForum(
      createForumDto
    );
  }

  @Put(':id/threads')
  async addThread(@Param('id') id: string, @Body() addThreadDto: AddThreadDto) {
    return await this.forumService.addThread(id, addThreadDto);
  }

  @Put(':id/threads/:threadIndex/posts')
  async addPost(
    @Param('id') id: string,
    @Param('threadIndex') threadIndex: number,
    @Body() addPostDto: AddPostDto,
  ) {
    return await this.forumService.addPost(id, threadIndex, addPostDto);
  }

  @Put(':id/threads/:threadIndex/posts/:postIndex/replies')
  async addReply(
    @Param('id') id: string,
    @Param('threadIndex') threadIndex: number,
    @Param('postIndex') postIndex: number,
    @Body() addReplyDto: AddReplyDto,
  ) {
    return await this.forumService.addReply(
      id,
      threadIndex,
      postIndex,
      addReplyDto,
    );
  }
}
