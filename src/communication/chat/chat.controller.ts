import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create.chat.dto';
import { AddMessageDto } from './dto/add.message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    try {
      return await this.chatService.create(createChatDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    try {
      return await this.chatService.findById(id);
    } catch (error) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id/messages')
  async addMessage(@Param('id') id: string, @Body() addMessageDto: AddMessageDto) {
    try {
      return await this.chatService.addMessage(id, addMessageDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    try {
      return await this.chatService.delete(id);
    } catch (error) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }
  }
}

