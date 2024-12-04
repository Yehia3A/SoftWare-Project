import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Endpoint to create a new quiz
  @Post('create')
  async createQuiz(
    @Body('moduleId') moduleId: string,
    @Body('questions') questions: any[],
  ) {
    return this.quizzesService.createQuiz(moduleId, questions);
  }

  // Endpoint to get quiz by ID
  @Get(':quizId')
  async getQuizById(@Param('quizId') quizId: string) {
    return this.quizzesService.getQuizById(quizId);
  }

  // Endpoint to submit a response
  @Post('submit')
  async submitResponse(
    @Body('userId') userId: string,
    @Body('quizId') quizId: string,
    @Body('answers') answers: { questionId: string; answer: string }[],
  ) {
    return this.quizzesService.submitResponse(userId, quizId, answers);
  }
  
  @Delete(':quizId')
  async deleteQuiz(@Param('quizId') quizId: string) {
    return this.quizzesService.deleteQuiz(quizId);
  }
}
