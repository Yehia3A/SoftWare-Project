import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get('start')
  async startQuiz(@Query('moduleId') moduleId: string) {
    return this.quizzesService.startQuiz(moduleId);
  }

  @Post('submit')
  async submitAnswer(@Body() submitAnswerDto: SubmitAnswerDto) {
    return this.quizzesService.submitAnswer(submitAnswerDto);
  }

  @Get('results')
  async getQuizResults(@Query('moduleId') moduleId: string, @Query('userId') userId: string) {
    return this.quizzesService.getQuizResults(moduleId, userId);
  }
}