import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { CreateChatDto } from './dto/create.chat.dto';
import { AddMessageDto } from './dto/add.message.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel(createChatDto);
    return await newChat.save();
  }

  async findById(id: string): Promise<Chat> {
    return await this.chatModel.findById(id).populate('sender receiver messages.sender').exec();
  }

  async addMessage(chatId: string, addMessageDto: AddMessageDto): Promise<Chat> {
    return await this.chatModel.findByIdAndUpdate(
      chatId,
      { $push: { messages: addMessageDto } },
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<Chat> {
    return await this.chatModel.findByIdAndDelete(id).exec();
  }
}

