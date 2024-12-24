import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
async create(@Body() createQuizDto: CreateQuizDto) {
  return this.quizzesService.create(createQuizDto);
}


@Post(':id/start')
async startQuiz(
  @Param('id') quizId: string,
  @Body('userId') userId: string,
) {
  return this.quizzesService.startQuiz(quizId, userId);
}


  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
  @Post(':id/submit')
async submitQuiz(
  @Param('id') quizId: string,
  @Body() userAnswers: Record<string, string>, // User answers in key-value format
) {
  return this.quizzesService.gradeQuiz(quizId, userAnswers);
}

}
