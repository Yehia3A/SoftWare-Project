import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './response.schema';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel(Response.name) private readonly responseModel: Model<ResponseDocument>,
  ) {}

  // Create a new quiz response
  async createResponse(responseData: Partial<Response>): Promise<Response> {
    const newResponse = new this.responseModel(responseData);
    return await newResponse.save();
  }

  // Get all responses for a specific quiz
  async getResponsesByQuiz(quizId: string): Promise<Response[]> {
    const responses = await this.responseModel.find({ quizId }).exec();
    if (!responses || responses.length === 0) {
      throw new NotFoundException(`No responses found for quiz ID: ${quizId}`);
    }
    return responses;
  }

  // Get a specific response by ID
  async getResponseById(responseId: string): Promise<Response> {
    const response = await this.responseModel.findOne({ responseId }).exec();
    if (!response) {
      throw new NotFoundException(`Response with ID ${responseId} not found`);
    }
    return response;
  }
}
