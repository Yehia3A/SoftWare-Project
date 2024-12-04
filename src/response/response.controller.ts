import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from './response.schema';

@Controller('responses')
export class ResponseController {
  constructor(private readonly responsesService: ResponseService) {}

  // Create a new response
  @Post()
  async createResponse(@Body() responseData: Partial<Response>): Promise<Response> {
    return this.responsesService.createResponse(responseData);
  }

  // Get all responses for a specific quiz
  @Get('quiz/:quizId')
  async getResponsesByQuiz(@Param('quizId') quizId: string): Promise<Response[]> {
    return this.responsesService.getResponsesByQuiz(quizId);
  }

  // Get a specific response by ID
  @Get(':responseId')
  async getResponseById(@Param('responseId') responseId: string): Promise<Response> {
    return this.responsesService.getResponseById(responseId);
  }
}
